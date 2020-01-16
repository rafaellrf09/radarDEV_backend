const express = require('express');
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require("cors");

const app = express();

mongoose.connect("mongodb+srv://root:A!b2c3d4e5@cluster0-thkyo.mongodb.net/week10?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(cors());
app.use(express.json())
app.use(routes)

app.listen(5000, () => console.log("Connect on port 5000"));
