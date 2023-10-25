import inquirer from 'inquirer';
import { readFile } from './fileReader.js';
import { sendToOpenAI } from './openaiService.js';

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
