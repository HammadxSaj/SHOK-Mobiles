
// import {products} from "./database/default_data.js"
const products = require("./database/default_data.js");

const Product = require("./model/product-schema.js");

const DefaultData = async() => {
    try{
        // await Product.deleteMany({});
        await Product.insertMany(products)
        console.log("Default data added successfully")
    }catch(error){
        console.log("Error in default data: ", error.message)
    }
    
}

module.exports = DefaultData;