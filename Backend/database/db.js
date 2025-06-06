const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

function connectToDatabase() {
    console.log("Connecting to MongoDB:", process.env.MONGODB_URI);
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.error("Error connecting to MongoDB:", err.message);
        process.exit(1); 
    });
}

module.exports = connectToDatabase;