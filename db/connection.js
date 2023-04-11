


const mongoose = require("mongoose");

const DB = 'mongodb://127.0.0.1:27017/authtest';


mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("connection start")).catch((error) => console.log(error.message));