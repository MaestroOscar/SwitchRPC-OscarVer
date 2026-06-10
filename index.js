//config
let production = true;
let version = 4;

//dependencies
const DiscordRPC = require('discord-rpc');
const ID_ORIGINAL = '1006157577459081296'; 
const ID_PERSONALIZADO = '1514171564172509224';

let rpc = null;
let currentClientId = '';

function conectarRPC(targetClientId) {
    if (currentClientId === targetClientId) return;

    if (rpc) {
        try {
            rpc.destroy();
        } catch (e) {
            console.log("Cambiando de aplicación RPC...");
        }
    }

    rpc = new DiscordRPC.Client({ transport: 'ipc' });
    rpc.login({ clientId: targetClientId }).catch(console.error);
    currentClientId = targetClientId;
}

const axios = require('axios');
const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');

let mainWindow;
let data;

//fix for linux
app.commandLine.appendSwitch('disable-seccomp-filter-sandbox')

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 700,
        frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.setMenu(null);

    axios.get('https://raw.githubusercontent.com/MaestroOscar/SwitchRPC-OscarVer/master/resources/rpc.json').then((res, err) => {
        if (err || !res.data) {
            mainWindow.loadFile('no-server.html');
        }
        try {
            data = res.data;
            mainWindow.loadFile('index.html');
        }
        catch(e) {
            mainWindow.loadFile('error.html');
        }
    });
}

app.whenReady().then(createWindow);


ipcMain.on('getGameData', function(event) {
    let gameArray = [];

    data.gameLibrary.forEach(function(game) {
        gameArray.push(game.name);
    });

    gameArray.sort();

    event.sender.send('sendingGameData', gameArray);
});

ipcMain.on('x', function() {
    app.quit();
});

ipcMain.on('max', function () {
    if (!mainWindow) return;
    if (mainWindow.isMaximized()) return mainWindow.unmaximize();
    else return mainWindow.maximize();
});

ipcMain.on('min', function() {
    if (!mainWindow) return;
    mainWindow.minimize();
});

let name;
let desc;
let consoleType = 'Nintendo Switch';
//catch values
ipcMain.on('game:value', function(e, value) {
    name = value;
});

ipcMain.on('console:value', function(e, value) {
    consoleType = value;
});

ipcMain.on('desc:value', function (e, value) {
   desc = value;
   findGame();
});

//RPC
function findGame() {
    let gotGame = name;
    let pic = 'switch';
    let appIdParaEsteJuego = ID_ORIGINAL; // Por defecto usamos la app original

    if (!name) return;

    data.gameLibrary.forEach(function(game) {
        game.aliases.forEach(function(alias) {
            if (alias === name.toLowerCase()) {
                gotGame = game.name;
                pic = game.pic;

                if (game.pic && game.pic.startsWith('o1_')) {
                    appIdParaEsteJuego = ID_PERSONALIZADO;
                }
            }
        });
    });

    
    conectarRPC(appIdParaEsteJuego);

    setTimeout(() => {
        // 🌟 CORREGIDO: Ahora sí le pasamos "smallPic" a la función que habla con Discord
        setPresence(gotGame, desc, pic, consoleType);
    }, 500); 
}

function setPresence(game, desc, pic, gameConsole) {
    if (desc.length < 2) {
        desc = 'Online';
    }

    if (!rpc) return;

    let lineaConsolaYDesc = `${gameConsole}  •  ${desc}`;

    rpc.setActivity({
        details: game,
        state: lineaConsolaYDesc,
        largeImageKey: pic, 
        largeImageText: 'SwitchRPC - Oscar Ver',
        smallImageText: gameConsole,
        
        instance: false,
    }).catch(err => console.error("Error al actualizar presencia:", err));
}