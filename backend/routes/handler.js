const express = require('express');
const { exec } = require('child_process');
const router = express.Router();
const Product = require('../model/product-schema.js');

// let scrapedData = []; // Store multiple product data in an array

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

router.post('/data', async(req, res) => {

  try {
    const { name, price, image, url, store } = req.body;
    const newData = {
      name,
      price,
      image,
      url,
      store,
    };

    // Perform asynchronous operation, e.g., database insertion
    await Product.create(newData);

    console.log("Data inserted successfully");
    res.status(200).send('Data received and inserted successfully');
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.url) {
      // Handle duplicate key error
      console.log(`Duplicate key error for URL: `);
      // Skip the duplicate entry by returning early
      return res.status(200).send('Duplicate entry skipped');
    } else {
      // Handle other errors
      console.log("Error in inserting data: ", error.message);
      res.status(500).json({ message: error.message });
    }
  }
});

router.get('/result', async(req, res) => {
  try{
    const products = await Product.find({});
    console.log('Products found:', products);
    res.status(200).json(products)
    console.log('Data sent to front end successfully')
  }catch(error){
    res.status(500).json({message: error.message})
    console.log('Data nooooooooot sent to front end successfully')
  }
  // res.json(scrapedData); // Return all scraped data as JSON
});

module.exports = router;
