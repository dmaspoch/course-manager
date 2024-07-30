// Create assistant with file search enabled
const OpenAI = require("openai");
const openai = new OpenAI();

// const express = require('express');
// const app = express();

// const router = express.Router();
// app.get('/', getText);

async function getText(req, res) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "Summarize whatever the user asks in 100 words or less",
      },
      {
        role: "user",
        content: "Summarize the movie Alien"
      },
    ],
    model: "gpt-4o",
  });
console.log(completion.choices[0].message.content);
}
getText();