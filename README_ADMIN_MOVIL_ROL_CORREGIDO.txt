{
  "name": "ynea-control-horario",
  "version": "1.0.0",
  "description": "Ynea Control Horario - nube, PWA y escritorio con copia local diaria",
  "main": "desktop/main.js",
  "scripts": {
    "start": "electron .",
    "desktop": "electron .",
    "dist": "electron-builder --win portable"
  },
  "build": {
    "appId": "es.ynea.controlhorario",
    "productName": "Control Horario",
    "files": [
      "index.html",
      "manifest.webmanifest",
      "service-worker.js",
      "vercel.json",
      "logo-ynea.png",
      "icon-192.png",
      "icon-512.png",
      "apple-touch-icon.png",
      "desktop/**/*"
    ],
    "win": {
      "target": "portable",
      "icon": "icon-512.png"
    }
  },
  "devDependencies": {
    "electron": "^31.0.0",
    "electron-builder": "^24.13.3"
  }
}