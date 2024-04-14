const express = require('express');
const { exec } = require('child_process');
const router = express.Router();
const Product = require('../model/product-schema.js');

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

// router.post('/data', (req, res) => {
//   const { name, price, image, url, store } = req.body;
//   const newData = {
//     name,
//     price,
//     image,
//     url,
//     store,
//   };
//   scrapedData.push(newData); // Push new data to the array
//   console.log('Received Name:', name);
//   console.log('Received Price:', price);
//   res.status(200).send('Data received successfully');
// });

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
