const prompt = require('prompt');
const fileReader = require('./fileReader');
const openaiService = require('./openaiService');

prompt.start();

prompt.get(['filePath'], function (err, result) {
  if (err) {
    console.error(err);
    return;
  }

  fileReader.readFile(result.filePath)
    .then(text => openaiService.sendToOpenAI(text))
    .then(response => console.log('Estimated remuneration package:', response.data.choices[0].text))
    .catch(err => console.error(err));
});
