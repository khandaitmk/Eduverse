const mongoose = require('mongoose');

require('dotenv').config();
exports.connectDB =  () => {
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology:true
    }).then(() => {
        console.log("Database is connected successfully");
    })
    .catch((error)=>{
        console.log("ERROR in the DB connection");
        console.error(error);
        process.exit(1);
    })
};