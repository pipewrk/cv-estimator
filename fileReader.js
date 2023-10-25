const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

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
        mammoth.extractRawText({path: filePath})
          .then(result => resolve(result.value))
          .catch(reject);
      } else {
        reject(new Error('Unsupported file type'));
      }
    });
  });
}

module.exports = { readFile };
