const fs = require('fs');
const pdfParse = require('pdf-parse');
const textract = require('textract');

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      if (filePath.endsWith('.pdf')) {
        pdfParse(data)
          .then(resolve)
          .catch(reject);
      } else if (filePath.endsWith('.docx')) {
        textract.fromFileWithPath(filePath, function(error, text) {
          if (error) {
            reject(error);
          } else {
            resolve(text);
          }
        });
      } else {
        reject(new Error('Unsupported file type'));
      }
    });
  });
}

module.exports = { readFile };
