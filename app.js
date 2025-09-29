const express = require("express");
require("dotenv").config();
const path = require("path");
const http = require("http");
const cors = require("cors");
const { routesInit } = require("./routes/config_routes");
require("./db/mongoConnect");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

routesInit(app);

const server = http.createServer(app);
let port = process.env.PORT || 3009;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
