const inquirer = require('inquirer');
const fileReader = require('./fileReader');
const openaiService = require('./openaiService');

inquirer.prompt([
  {
    type: 'input',
    name: 'filePath',
    message: 'Enter the file path:'
  }
]).then(result => {
  fileReader.readFile(result.filePath)
    .then(text => openaiService.sendToOpenAI(text))
    .then(response => console.log('Estimated remuneration package:', response.data.choices[0].text))
    .catch(err => console.error(err));
});
