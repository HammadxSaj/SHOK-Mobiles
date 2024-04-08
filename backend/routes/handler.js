const express = require('express');
const { exec } = require('child_process');
const router = express.Router();

let scrapedData = []; // Store multiple product data in an array

function executePythonScript() {
  exec('python scrap.py');
  exec('python scraper.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}
executePythonScript();

router.post('/data', (req, res) => {
  const { name, price, image, url, store } = req.body;
  const newData = {
    name,
    price,
    image,
    url,
    store,
  };
  scrapedData.push(newData); // Push new data to the array
  console.log('Received Name:', name);
  console.log('Received Price:', price);
  res.status(200).send('Data received successfully');
});

router.get('/result', (req, res) => {
  res.json(scrapedData); // Return all scraped data as JSON
});

module.exports = router;
