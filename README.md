To create a Node.js application that prompts for the path of a local PDF or DOC file, parses the entire text, and sends it to the OpenAI API with the prompt "Given the following CV, estimate the total remuneration package for this candidate", we will need the following files:

1. package.json: This file will contain the project metadata and dependencies.
2. app.js: This is the main entry point of the application.
3. fileReader.js: This file will contain the logic to read and parse the PDF or DOC file.
4. openaiService.js: This file will contain the logic to interact with the OpenAI API.

Let's start with the package.json file:

package.json
