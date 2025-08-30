const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

// Launch a new browser instance
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Load the Puter.js script
  await page.goto('https://js.puter.com/v2/');

  // Expose API endpoints
  app.use(express.json());

  app.post('/generate-text', async (req, res) => {
    const { prompt } = req.body;
    const puter = await page.evaluate(() => window.puter);

    // Use Puter.js to generate text
    const text = await puter.ai.chat(prompt, {
      model: 'gpt-5-nano',
    });

    // Send the generated text back to the bot
    res.send({ text });
  });

  // Start the server
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
})();
