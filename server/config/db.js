const mongoose = require('mongoose');
require('dotenv').config();

const dblink = process.env.MONGODB_URI;
console.log("helooo",dblink);
function connectDB() {
    mongoose.connect(dblink, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database connected successfully");
        console.log("http://localhost:8000");
    })
    .catch((err) => {
        console.log(err, "error occurred in database connection");
    });
}

module.exports = connectDB;
