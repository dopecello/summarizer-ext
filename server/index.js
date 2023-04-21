const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/summarize', async (req, res) => {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Say something nice to me.' }],
      max_tokens: 64,
      temperature: 0.6,
    });
    return res.status(200).json({
      success: true,
      data: response.data
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.response
      ? error.response.data
      : "There was an issue on the server"
    })
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
