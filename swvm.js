const fs = require('fs')

function addVersion(){
    const swFile = './src/serviceWorker.js';
    const data = fs.readFileSync(swFile, 'utf8');
    const firstLine = data.substring(0,data.indexOf('\n')).replace(';','').trimEnd();
    const oldVersion = firstLine.substring(firstLine.lastIndexOf(' '));
    const newLine = firstLine.replace(oldVersion,` \'${makeid(6)}\'`);
    const newData = data.replace(firstLine,newLine);
    fs.writeFileSync(swFile, newData, 'utf8');
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

addVersion();