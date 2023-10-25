const openai = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
openai.apiKey = OPENAI_API_KEY;

function sendToOpenAI(text) {
  const data = {
    engine: 'davinci-codex',
    prompt: `Estimate the total remuneration package for this candidate given the following CV:\n${text}`,
    max_tokens: 60
  };

  return openai.Completion.create(data);
}

module.exports = { sendToOpenAI };
