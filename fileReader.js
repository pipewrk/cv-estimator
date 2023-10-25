const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');
const os = require('os');

function readFile(filePath) {
  // Replace ~ with the home directory path
  if (filePath.startsWith('~')) {
    filePath = path.join(os.homedir(), filePath.slice(1));
  }

  // Convert to absolute path
  filePath = path.resolve(filePath);

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      pdf(data).then(function(data) {
        resolve(data.text);
      }).catch(function(error){
        reject(error);
      });
    });
  });
}

module.exports = { readFile };
