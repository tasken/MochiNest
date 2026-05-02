import { PixlToolsClient } from "./client.js";

const el = {
  btnConnect: document.getElementById("btnConnect"),
  btnDisconnect: document.getElementById("btnDisconnect"),
  connState: document.getElementById("connState"),
  regularFileSize: document.getElementById("regularFileSize"),
  regularFilesCount: document.getElementById("regularFilesCount"),
  regularFilesPerFolder: document.getElementById("regularFilesPerFolder"),
  regularChunks: document.getElementById("regularChunks"),
  regularRepeats: document.getElementById("regularRepeats"),
  btnRunRegular: document.getElementById("btnRunRegular"),
  regularSummary: document.getElementById("regularSummary"),
  regularTable: document.getElementById("regularTable"),
  regularTableBody: document.querySelector("#regularTable tbody"),

  dfuFile: document.getElementById("dfuFile"),
  dfuDelays: document.getElementById("dfuDelays"),
  dfuAlreadyInMode: document.getElementById("dfuAlreadyInMode"),
  btnRunDfu: document.getElementById("btnRunDfu"),
  dfuSummary: document.getElementById("dfuSummary"),
  dfuTable: document.getElementById("dfuTable"),
  dfuTableBody: document.querySelector("#dfuTable tbody"),

  log: document.getElementById("log"),
};

const state = {
  client: null,
  connected: false,
  runningRegular: false,
  runningDfu: false,
};

function log(message, cls = "") {
  const line = document.createElement("div");
  if (cls) line.className = cls;
  line.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
  el.log.appendChild(line);
  el.log.scrollTop = el.log.scrollHeight;
}

function setConnectionState(connected, label = "") {
  state.connected = connected;
  el.connState.textContent = connected ? `connected${label ? `: ${label}` : ""}` : "disconnected";
}

function parseNumberList(raw, kind, min = 1) {
  const values = raw.split(",").map(s => Number.parseInt(s.trim(), 10)).filter(n => Number.isFinite(n));
  if (!values.length) throw new Error(`Provide at least one ${kind} value.`);
  if (values.some(v => v < min)) throw new Error(`${kind} values must be >= ${min}.`);
  return [...new Set(values)];
}

function bytesToKbPerSec(bytes, seconds) {
  if (seconds <= 0) return 0;
  return (bytes / 1024) / seconds;
}

function joinRemote(base, name) {
  return base.endsWith("/") ? `${base}${name}` : `${base}/${name}`;
}

function parentRemote(path) {
  const i = path.lastIndexOf("/");
  return i <= 2 ? `${path.slice(0, 3)}` : path.slice(0, i);
}

function baseRemote(path) {
  const i = path.lastIndexOf("/");
  return i === -1 ? path : path.slice(i + 1);
}

function isNotFoundError(message) {
  return String(message || "").toLowerCase().includes("not found");
}

function isAlreadyExistsError(message) {
  return String(message || "").toLowerCase().includes("already exists");
}

function isCommandFailedError(message) {
  return String(message || "").toLowerCase().includes("command failed");
}

function setButtons() {
  const busy = state.runningRegular || state.runningDfu;
  el.btnConnect.disabled = busy;
  el.btnDisconnect.disabled = busy;
  el.btnRunRegular.disabled = busy;
  el.btnRunDfu.disabled = busy;
}

async function ensureRegularClientConnected() {
  if (state.client && state.connected) return state.client;
  const client = new PixlToolsClient((msg) => log(`[regular] ${msg}`));
  client.onDisconnect = () => setConnectionState(false);
  await client.connect();
  state.client = client;
  setConnectionState(true, client.device?.name || "");
  return client;
}

async function getRemoteEntryType(client, path) {
  const parent = parentRemote(path);
  const base = baseRemote(path);
  const listRes = await client.readFolder(parent);
  if (!listRes.ok) {
    if (isNotFoundError(listRes.error)) return null;
    throw new Error(`Read folder failed (${parent}): ${listRes.error}`);
  }
  const entry = listRes.data.find(e => e.name === base);
  return entry ? entry.type : null;
}

async function ensureFolderPath(client, path) {
  const type = await getRemoteEntryType(client, path);
  if (type === "DIR") return;
  if (type === "FILE") {
    const rmRes = await client.removePath(path);
    if (!rmRes.ok && !isNotFoundError(rmRes.error)) {
      throw new Error(`Remove conflicting file failed (${path}): ${rmRes.error}`);
    }
  }
  const res = await client.createFolder(path);
  if (!res.ok && !isAlreadyExistsError(res.error)) {
    throw new Error(`Create folder failed (${path}): ${res.error}`);
  }
}

async function removePathTree(client, path) {
  const listRes = await client.readFolder(path);
  if (!listRes.ok) {
    if (isNotFoundError(listRes.error)) return;
    throw new Error(`Read folder failed (${path}): ${listRes.error}`);
  }
  for (const entry of listRes.data) {
    const childPath = joinRemote(path, entry.name);
    if (entry.type === "DIR") {
      await removePathTree(client, childPath);
    } else {
      const rmRes = await client.removePath(childPath);
      if (!rmRes.ok && !isNotFoundError(rmRes.error)) {
        throw new Error(`Remove file failed (${childPath}): ${rmRes.error}`);
      }
    }
  }
  const rmRes = await client.removePath(path);
  if (!rmRes.ok && !isNotFoundError(rmRes.error)) {
    // Best-effort cleanup: firmware can sometimes report generic "Command failed"
    // on folder delete even after children were removed.
    if (isCommandFailedError(rmRes.error)) return;
    throw new Error(`Remove folder failed (${path}): ${rmRes.error}`);
  }
}

async function cleanupBenchRoot(client, benchRoot) {
  const type = await getRemoteEntryType(client, benchRoot);
  if (!type) return;
  if (type === "FILE") {
    const rmRes = await client.removePath(benchRoot);
    if (!rmRes.ok && !isNotFoundError(rmRes.error)) {
      throw new Error(`Remove stale file failed (${benchRoot}): ${rmRes.error}`);
    }
    return;
  }
  await removePathTree(client, benchRoot);
}

async function runRegularSweep() {
  state.runningRegular = true;
  setButtons();
  try {
    const fileSizeBytes = Number.parseInt(el.regularFileSize.value, 10);
    const filesCount = Number.parseInt(el.regularFilesCount.value, 10);
    const filesPerFolder = Number.parseInt(el.regularFilesPerFolder.value, 10);
    if (!Number.isFinite(fileSizeBytes) || fileSizeBytes < 1) throw new Error("File size must be >= 1 byte.");
    if (!Number.isFinite(filesCount) || filesCount < 1) throw new Error("Total files per run must be >= 1.");
    if (!Number.isFinite(filesPerFolder) || filesPerFolder < 1) throw new Error("Files per folder must be >= 1.");

    const chunkSizes = parseNumberList(el.regularChunks.value, "chunk size");
    const repeats = Number.parseInt(el.regularRepeats.value, 10);
    if (!Number.isFinite(repeats) || repeats < 1 || repeats > 10) throw new Error("Repeats must be 1-10.");

    const client = await ensureRegularClientConnected();
    const drivesRes = await client.listDrives();
    if (!drivesRes.ok || !drivesRes.data.length) throw new Error(drivesRes.error || "No drive available.");
    const drive = drivesRes.data.find(d => d.status === 0) || drivesRes.data[0];

    const benchRoot = `${drive.label}:/_mochi`;
    log(`[regular] Cleaning stale benchmark workspace: ${benchRoot}`);
    try {
      await cleanupBenchRoot(client, benchRoot);
    } catch (err) {
      log(`[regular] Cleanup warning: ${err.message || String(err)}`, "err");
    }
    await ensureFolderPath(client, benchRoot);

    const testBlob = new Blob([new Uint8Array(fileSizeBytes)], { type: "application/octet-stream" });
    const bytesPerRun = fileSizeBytes * filesCount;
    const rows = [];
    el.regularTableBody.innerHTML = "";
    el.regularTable.hidden = false;
    el.regularSummary.textContent = "";

    for (const chunkSize of chunkSizes) {
      let okRuns = 0;
      let totalSeconds = 0;
      let lastErr = "";
      for (let i = 0; i < repeats; i++) {
        const runRoot = joinRemote(benchRoot, `c${chunkSize}r${i + 1}`);
        const t0 = performance.now();
        try {
          await ensureFolderPath(client, runRoot);
          const createdFolders = new Set();
          for (let fileIndex = 0; fileIndex < filesCount; fileIndex++) {
            const folderNumber = Math.floor(fileIndex / filesPerFolder) + 1;
            const folderPath = joinRemote(runRoot, `t${folderNumber}`);
            if (!createdFolders.has(folderPath)) {
              await ensureFolderPath(client, folderPath);
              createdFolders.add(folderPath);
            }
            const filePath = joinRemote(folderPath, `f${String(fileIndex + 1).padStart(4, "0")}.bin`);
            await client.uploadFile(filePath, testBlob, () => {}, null, chunkSize);
          }
          const dt = (performance.now() - t0) / 1000;
          okRuns++;
          totalSeconds += dt;
          log(`[regular] chunk=${chunkSize} run=${i + 1}/${repeats} ${dt.toFixed(2)}s`, "ok");
        } catch (err) {
          lastErr = err.message || String(err);
          log(`[regular] chunk=${chunkSize} failed: ${lastErr}`, "err");
        } finally {
          await removePathTree(client, runRoot).catch(() => {});
        }
      }
      const avgSec = okRuns ? totalSeconds / okRuns : 0;
      const kbps = okRuns ? bytesToKbPerSec(bytesPerRun, avgSec) : 0;
      rows.push({ chunkSize, okRuns, repeats, avgSec, kbps, status: okRuns ? "ok" : "failed", detail: lastErr });
    }

    for (const row of rows) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="mono">${row.chunkSize}</td>
        <td class="mono">${row.okRuns}/${row.repeats}</td>
        <td class="mono">${row.okRuns ? row.avgSec.toFixed(2) : "-"}</td>
        <td class="mono">${row.okRuns ? row.kbps.toFixed(1) : "-"}</td>
        <td class="${row.status === "ok" ? "ok" : "err"}">${row.status}${row.detail ? ` (${row.detail})` : ""}</td>
      `;
      el.regularTableBody.appendChild(tr);
    }

    const best = rows.filter(r => r.okRuns > 0).sort((a, b) => b.kbps - a.kbps)[0];
    el.regularSummary.textContent = best
      ? `Best regular chunk size: ${best.chunkSize} bytes (${best.kbps.toFixed(1)} KB/s avg, ${filesCount} files x ${fileSizeBytes}B)`
      : "No successful run. See log.";
    log(`[regular] Final cleanup: ${benchRoot}`);
    await cleanupBenchRoot(client, benchRoot).catch(() => {});
  } catch (err) {
    log(err.message || String(err), "err");
  } finally {
    state.runningRegular = false;
    setButtons();
  }
}

async function resolveOtaZip(fileBlob, fileName) {
  const zip = await window.JSZip.loadAsync(fileBlob);
  if (zip.file("manifest.json")) return fileBlob;
  const nested = Object.values(zip.files).find(e => !e.dir && e.name.toLowerCase().endsWith(".zip"));
  if (!nested) throw new Error("No DFU package found inside this zip.");
  return nested.async("blob");
}

async function loadDfuImages(zipBlob) {
  const zip = await window.JSZip.loadAsync(zipBlob);
  const manifestFile = zip.file("manifest.json");
  if (!manifestFile) throw new Error("manifest.json is missing.");
  const root = JSON.parse(await manifestFile.async("string"));
  const manifest = root.manifest || {};

  async function getImage(types) {
    for (const type of types) {
      const entry = manifest[type];
      if (!entry) continue;
      const init = zip.file(entry.dat_file);
      const image = zip.file(entry.bin_file);
      if (!init || !image) throw new Error(`Package missing ${type} files.`);
      return {
        type,
        initData: await init.async("arraybuffer"),
        imageData: await image.async("arraybuffer"),
      };
    }
    return null;
  }

  return {
    baseImage: await getImage(["softdevice", "bootloader", "softdevice_bootloader"]),
    appImage: await getImage(["application"]),
  };
}

async function runSingleDfu(images, delayMs) {
  const dfu = new window.SecureDfu(window.CRC32.buf, undefined, delayMs);
  const device = await dfu.requestDevice(false, [{ services: [window.SecureDfu.SERVICE_UUID] }]);
  const t0 = performance.now();
  if (images.baseImage) await dfu.update(device, images.baseImage.initData, images.baseImage.imageData);
  if (images.appImage) await dfu.update(device, images.appImage.initData, images.appImage.imageData);
  return (performance.now() - t0) / 1000;
}

async function runDfuSweep() {
  state.runningDfu = true;
  setButtons();
  try {
    if (!window.JSZip || !window.CRC32 || !window.SecureDfu) {
      throw new Error("DFU libs failed to load.");
    }
    const file = el.dfuFile.files?.[0];
    if (!file) throw new Error("Pick a DFU package zip first.");
    const delayList = parseNumberList(el.dfuDelays.value, "delay", 0);
    const alreadyInDfu = el.dfuAlreadyInMode.checked;

    const { baseImage, appImage } = await loadDfuImages(await resolveOtaZip(file, file.name));
    if (!baseImage && !appImage) throw new Error("No firmware image in package.");

    el.dfuTableBody.innerHTML = "";
    el.dfuTable.hidden = false;
    el.dfuSummary.textContent = "";
    const rows = [];

    for (const delayMs of delayList) {
      let status = "ok";
      let detail = "";
      let seconds = 0;
      try {
        if (!alreadyInDfu) {
          const client = await ensureRegularClientConnected();
          log(`[dfu] Entering DFU for delay=${delayMs}...`);
          const enterRes = await client.enterDfu();
          if (!enterRes.ok) throw new Error(enterRes.error || "enterDfu failed");
          setConnectionState(false);
          await new Promise(r => setTimeout(r, 3000));
        } else {
          log(`[dfu] Assuming device already in DFU mode for delay=${delayMs}...`);
        }
        log(`[dfu] Run delay=${delayMs}ms. Select DFU device in picker.`);
        seconds = await runSingleDfu({ baseImage, appImage }, delayMs);
        log(`[dfu] delay=${delayMs} success in ${seconds.toFixed(2)}s`, "ok");
      } catch (err) {
        status = "failed";
        detail = err.message || String(err);
        log(`[dfu] delay=${delayMs} failed: ${detail}`, "err");
      }
      rows.push({ delayMs, seconds, status, detail });
    }

    for (const row of rows) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="mono">${row.delayMs}</td>
        <td class="mono">${row.status === "ok" ? row.seconds.toFixed(2) : "-"}</td>
        <td class="${row.status === "ok" ? "ok" : "err"}">${row.status}</td>
        <td>${row.detail || "-"}</td>
      `;
      el.dfuTableBody.appendChild(tr);
    }

    const best = rows.filter(r => r.status === "ok").sort((a, b) => a.seconds - b.seconds)[0];
    el.dfuSummary.textContent = best
      ? `Best DFU delay: ${best.delayMs} ms (${best.seconds.toFixed(2)} s)`
      : "No successful DFU run. See log.";
  } catch (err) {
    log(err.message || String(err), "err");
  } finally {
    state.runningDfu = false;
    setButtons();
  }
}

el.btnConnect.addEventListener("click", async () => {
  try {
    await ensureRegularClientConnected();
  } catch (err) {
    log(err.message || String(err), "err");
  }
});

el.btnDisconnect.addEventListener("click", () => {
  if (state.client) state.client.disconnect();
  state.client = null;
  setConnectionState(false);
});

el.btnRunRegular.addEventListener("click", runRegularSweep);
el.btnRunDfu.addEventListener("click", runDfuSweep);

setButtons();
setConnectionState(false);
log("Ready.");
