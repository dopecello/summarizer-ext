const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const openaiApiKey = process.env.OPENAI_API_KEY;
const openaiApiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

app.post('/summarize', async (req, res) => {
  try {
    const { text, maxLength } = req.body;

    const response = await axios.post(
      openaiApiUrl,
      {
        prompt: `summarize the following text in ${maxLength} words: ${text}`,
        max_tokens: maxLength * 2,
        n: 1,
        stop: null,
        temperature: 0.5,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiApiKey}`,
        },
      }
    );

    const summary = response.data.choices[0].text.trim();
    res.json({ summary });

  } catch (error) {
    console.error('Error in OpenAI API request:', error);
    res.status(500).json({ error: 'Error in API request' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));