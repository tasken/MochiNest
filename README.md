# Mochi

A browser-based tool to manage files and update firmware on [Pixl.js](https://github.com/solosky/pixl.js)-based NFC devices over Bluetooth. No app, no drivers, no cables.

**[Try it](https://tasken.github.io/Mochi/)** (requires Chrome, Edge, or Brave).

![Mochi file browser showing a connected device with folders and files](screenshot.png)

## File management

Connect your device and manage its storage directly from the browser:

- **File browser**: navigate folders, rename, delete, and multi-select files
- **Tree uploader**: drop a local folder or files to upload with real-time progress
- **Sync**: diff local and device trees, push changes, and remove orphaned files
- **Normalize**: lowercase-rename files and folders for firmware compatibility
- **Format**: wipe and reformat the device drive
- **NFC tag lookup**: `.bin` files show character name and series from [AmiiboAPI](https://amiiboapi.org/)

## Firmware update

Flash firmware directly over Bluetooth using Nordic Secure DFU. No cables or tools required.

- Supports official and community builds
- Works with devices already in update mode
- Pick a release from the built-in list or use a local `.zip` file
- Notified when a newer firmware version is available

Compatible with [Pixl.js](https://github.com/solosky/pixl.js)-based devices (allmiibo, amiibotool, Wuzplay, Flashiibo, and others).

## Development

To run the app locally:

```bash
# Generate a self-signed cert (one-time)
mkdir -p .cert
openssl req -x509 -newkey rsa:2048 -keyout .cert/key.pem -out .cert/cert.pem \
  -days 365 -nodes -subj "/CN=localhost"

# Start the dev server (HTTPS at localhost:8443)
python3 server.py --cert .cert/cert.pem --key .cert/key.pem
```

> Click **Mock device** in the top bar to simulate a connected device without hardware. The button is only visible in local dev mode.

## License

MIT. See [LICENSE](LICENSE).

## Thanks

- [solosky/pixl.js](https://github.com/solosky/pixl.js) for the open-source firmware that makes all of this possible
- [thegecko/web-bluetooth-dfu](https://github.com/thegecko/web-bluetooth-dfu) for the Web Bluetooth Nordic Secure DFU implementation used for firmware updates
