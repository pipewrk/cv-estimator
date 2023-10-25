const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions';

function sendToOpenAI(text) {
  const data = {
    prompt: `Estimate the total remuneration package for this candidate given the following CV:\n${text}`,
    max_tokens: 60
  };

  const config = {
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    }
  };

  return axios.post(OPENAI_API_URL, data, config);
}

module.exports = { sendToOpenAI };
