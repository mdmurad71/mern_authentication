const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/connection.js");

const cors = require("cors");
const router = require("./routes/router.js");

const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json("server start")
})

app.use(router);

app.listen(port, () => {
    console.log(`server is start port number ${port}`);
});