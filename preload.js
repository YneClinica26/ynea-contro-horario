
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
const configPath = path.join(app.getPath('userData'), 'ynea-config.json');

function readConfig(){
  try { return JSON.parse(fs.readFileSync(configPath, 'utf8')); }
  catch(e){ return {}; }
}

function writeConfig(config){
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
}

function dateName(){
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,'0');
  const day = String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${day}`;
}

function saveBackup(data, force=false){
  const config = readConfig();
  if(!config.backupPath) return { ok:false, reason:'NO_BACKUP_PATH' };

  const today = dateName();
  if(!force && config.lastBackupDate === today) {
    return { ok:true, skipped:true, reason:'ALREADY_DONE_TODAY' };
  }

  if(!fs.existsSync(config.backupPath)){
    fs.mkdirSync(config.backupPath, { recursive:true });
  }

  const fileJson = path.join(config.backupPath, `Ynea_Control_Horario_${today}.json`);
  fs.writeFileSync(fileJson, JSON.stringify(data || {}, null, 2), 'utf8');

  const csvRows = [];
  const punches = data && data.data && Array.isArray(data.data.punches) ? data.data.punches : [];
  const employees = data && data.data && Array.isArray(data.data.employees) ? data.data.employees : [];

  function empName(id){
    const e = employees.find(x => x.id === id);
    return e ? e.name : id;
  }

  csvRows.push(['Fecha','Hora','Empleado','Tipo','Dispositivo','Huella']);
  punches.forEach(p => {
    const d = new Date(p.time);
    csvRows.push([
      d.toLocaleDateString('es-ES'),
      d.toLocaleTimeString('es-ES', { hour:'2-digit', minute:'2-digit' }),
      empName(p.employeeId),
      p.type || '',
      p.device || '',
      p.hash || ''
    ]);
  });

  const csv = csvRows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g,'""')}"`).join(';')).join('\n');
  const fileCsv = path.join(config.backupPath, `Ynea_Control_Horario_${today}.csv`);
  fs.writeFileSync(fileCsv, csv, 'utf8');

  config.lastBackupDate = today;
  writeConfig(config);
  return { ok:true, json:fileJson, csv:fileCsv };
}

async function requestBackupAndSave(force=false){
  if(!mainWindow || mainWindow.isDestroyed()) return { ok:false };
  try{
    const data = await mainWindow.webContents.executeJavaScript('window.getYneaBackupData ? window.getYneaBackupData() : null', true);
    return saveBackup(data, force);
  }catch(e){
    return { ok:false, error:String(e) };
  }
}

function createWindow(){
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 850,
    minWidth: 1024,
    minHeight: 700,
    title: 'Control Horario',
    autoHideMenuBar: true,
    icon: path.join(__dirname, '..', 'icon-512.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, '..', 'index.html'));

  mainWindow.on('close', async (event) => {
    if (mainWindow.__backupDone) return;
    event.preventDefault();
    await requestBackupAndSave(false);
    mainWindow.__backupDone = true;
    mainWindow.close();
  });
}

app.whenReady().then(createWindow);

app.on('before-quit', async (event) => {
  if(mainWindow && !mainWindow.__backupDone){
    event.preventDefault();
    await requestBackupAndSave(false);
    mainWindow.__backupDone = true;
    app.quit();
  }
});

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') app.quit();
});

ipcMain.handle('choose-backup-folder', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: 'Elige la carpeta para las copias de Ynea Control Horario',
    properties: ['openDirectory', 'createDirectory']
  });

  if(result.canceled || !result.filePaths[0]) return '';

  const config = readConfig();
  config.backupPath = result.filePaths[0];
  writeConfig(config);
  return config.backupPath;
});

ipcMain.handle('get-backup-path', async () => {
  return readConfig().backupPath || '';
});

ipcMain.handle('save-backup-now', async (event, data) => {
  return saveBackup(data, true);
});
