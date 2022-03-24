const fs = require('fs');
const { argv } = require('process');
const { exec } = require('child_process');

const sourceFolder = argv[2]
const destinationFolder = argv[3];
if (!destinationFolder) {
    console.error('destinationFolder is empty!');
    return;
};
if (!sourceFolder) {
    console.error('sourceFolder is empty!');
    return;
};
async function buildAndDeploy() {
  const deploy = () => {
    fs.readdir('./build', function (err, files) {
      //handling error
      if (err) {
        return console.log('Unable to scan directory: ' + err);
      }
      //listing all files using forEach
      const sources = files.map((c) => sourceFolder + c).join(' ');
      const command = `scp -r -i ./id_rsa ${sources} Administrator@193.151.129.31:/C:/inetpub/wwwroot/${destinationFolder}`;
      console.log(command);
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`Successfuly Deployed.`);
      });
    });
  };
  exec('npm run build', (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (!error){
        deploy();
    }else{
        console.error('Error on build');
    }
  });
}

buildAndDeploy();
