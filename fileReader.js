const fs = require('fs');
const textract = require('textract');

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      textract.fromFileWithPath(filePath, function(error, text) {
        if (error) {
          reject(error);
        } else {
          resolve(text);
        }
      });
    });
  });
}

module.exports = { readFile };
