const express = require("express");
const http = require("http");
const cors = require("cors");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT;
const server = http.createServer(app);
const allowedOrigins = JSON.parse(process.env.ALLOWED_ORIGINS);
const options = {
  origin: allowedOrigins,
  // methods: "GET,POST,PUT,DELETE",
  credentials: true,
};

app.use(express.json());
app.use(cors(options));
app.use(require("./Routes/index"));
// app.use("/", (req, res) => res.send("Hello World!"));

server.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
