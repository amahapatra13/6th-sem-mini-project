//connection to the mongoDb database 
//the default url is in the default.json file

const mongoose = require("mongoose");

const config = require("config");

const db = config.get('mongouri');

const connectDB =  async () => {
    try {
       await mongoose.connect(db, {
           useNewUrlParser : true,
           useUnifiedTopology : true,
           useCreateIndex: true
       });
       console.log("MongoDB connected")
    } catch(err){
        console.log(err.message);
        // Exit process when failed
        process.exit(1);
    }
}

module.exports = connectDB;