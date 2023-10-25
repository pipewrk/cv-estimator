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
    .then(response => {
      if (response.choices && response.choices.length > 0) {
        console.log('Estimated remuneration package:', response.choices[0].message);
      } else {
        console.log(response)
      }
    })
    .catch(err => console.error(err));
});
