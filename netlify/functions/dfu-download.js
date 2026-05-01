export async function handler(event) {
  const url = new URL(event.rawUrl);
  const path = url.pathname.replace(/^\/dfu-proxy\//, "");

  if (!path || !/^[\w.\-]+\/[\w.\-]+\.zip$/.test(path)) {
    return { statusCode: 400, body: "Invalid path" };
  }

  const upstream = `https://github.com/solosky/pixl.js/releases/download/${path}`;
  const response = await fetch(upstream);

  if (!response.ok) {
    return { statusCode: response.status, body: `Upstream error: ${response.status}` };
  }

  const buffer = await response.arrayBuffer();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/octet-stream",
      "Access-Control-Allow-Origin": "*",
    },
    body: Buffer.from(buffer).toString("base64"),
    isBase64Encoded: true,
  };
}
