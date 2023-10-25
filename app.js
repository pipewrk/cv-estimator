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
      if (response.data && response.data.choices && response.data.choices.length > 0) {
        console.log('Estimated remuneration package:', response.data.choices[0].text);
      } else {
        console.error('Unexpected response from OpenAI:', response);
      }
    })
    .catch(err => console.error(err));
});
