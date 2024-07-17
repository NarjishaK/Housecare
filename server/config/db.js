const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect("mongodb+srv://narjishakuniyil:e7eEAKgbyxLzh3AG@housecare.243sss4.mongodb.net/?retryWrites=true&w=majority&appName=housecare", {
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


