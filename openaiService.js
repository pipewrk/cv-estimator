const { OpenAI } = require('openai');
const { config } = require('dotenv');

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

module.exports = sendToOpenAI;
