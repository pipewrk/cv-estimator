# META: RES

## Folder Structure

```plaintext
/Users/jasonnathan/Repos/res
├── README.md
├── app.js
├── fileReader.js
├── openaiService.js
├── package-lock.json
├── package.json
├── prompt
└── run.sh

1 directory, 8 files
```
## File: README.md

```md
To create a Node.js application that prompts for the path of a local PDF or DOC file, parses the entire text, and sends it to the OpenAI API with the prompt "Given the following CV, estimate the total remuneration package for this candidate", we will need the following files:

1. package.json: This file will contain the project metadata and dependencies.
2. app.js: This is the main entry point of the application.
3. fileReader.js: This file will contain the logic to read and parse the PDF or DOC file.
4. openaiService.js: This file will contain the logic to interact with the OpenAI API.

Let's start with the package.json file:

package.json

```

## File: package.json

```json
{
  "name": "cv-estimator",
  "version": "1.0.0",
  "description": "Estimates the total remuneration package for a candidate based on their CV",
  "main": "app.js",
  "type": "commonjs",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "dotenv": "^10.0.0",
    "inquirer": "^8.2.0",
    "openai": "^4.13.0",
    "pdf-parse": "^1.1.1"
  }
}

```

## Git Repository

```plaintext

```
## File: app.js
```js
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
        let message = response.choices[0].message.content.trim();
        message = message.replace(/\n/g, '\n');
        message = message.replace(/\+/g, '');
        console.log('Estimated remuneration package:\n', message);
      } else {
        console.log(response)
      }
    })
    .catch(err => console.error(err));
});

```
## File: openaiService.js
```js
const { OpenAI } = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

async function sendToOpenAI(text) {
  const data = {
    messages: [{
      role: 'system',
      content: `Estimate the total remuneration package for this candidate given the following CV:\n${text}`
    }],
    model: 'gpt-3.5-turbo',
  };

  const response = await openai.chat.completions.create(data);
  return response;
}

module.exports = { sendToOpenAI };

```
## File: fileReader.js
```js
const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');
const os = require('os');

function readFile(filePath) {
  // Replace ~ with the home directory path
  if (filePath.startsWith('~')) {
    filePath = path.join(os.homedir(), filePath.slice(1));
  }

  // Convert to absolute path
  filePath = path.resolve(filePath);

  return new Promise((resolve, reject) => {
    if (fs.existsSync(filePath)) {
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
    } else {
      reject(new Error(`File not found: ${filePath}`));
    }
  });
}

module.exports = { readFile };

```