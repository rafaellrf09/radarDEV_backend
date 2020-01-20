const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const http = require("http");
const cors = require("cors");
const { setupWebsocket } = require("./websocket")

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect("mongodb+srv://root:A!b2c3d4e5@cluster0-thkyo.mongodb.net/week10?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
// mongoose.connect("mongodb://10.22.1.139:27017/week10", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })

app.use(cors());
app.use(express.json())
app.use(routes)

//subindo servidor
const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Connect on port ${port}`));
