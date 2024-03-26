const mongoose = require("mongoose");

exports.connectDatabase = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Database Connection Established!`);
        
    } catch (error) {
        console.log(error.message);
        
    }
}