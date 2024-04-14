const mongoose = require("mongoose");

const Connection = async () => {
    const URL = "mongodb+srv://user:123@mobile-shop.yfjcasu.mongodb.net/" ;
    try{
       await mongoose.connect(URL, {useUnifiedTopology: true , useNewUrlParser: true});
       console.log('Database connected successfully');
    } catch (error) {
        console.log('Error connecting database: ', error.message);
    }
}

module.exports = Connection;