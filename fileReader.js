const fs = require('fs');
const pdf = require('pdf-parse');

function readFile(filePath) {
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
