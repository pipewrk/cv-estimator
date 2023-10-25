const inquirer = require('inquirer');
const { readFile } = require('./fileReader.js');
const { sendToOpenAI } = require('./openaiService.js');

inquirer.prompt([
  {
    type: 'input',
    name: 'filePath',
    message: 'Enter the file path:'
  }
]).then(result => {
  readFile(result.filePath)
    .then(text => sendToOpenAI(text))
    .then(response => console.log('Estimated remuneration package:', response.data.choices[0].text))
    .catch(err => console.error(err));
});
