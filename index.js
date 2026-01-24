const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
app.set("trust proxy", 1);
const allowedOrigins = JSON.parse(process.env.ALLOWED_ORIGINS || "[]");
const options = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow mobile apps or curl with no origin
    if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};
// Minimal env info
console.log(`NODE_ENV: ${process.env.NODE_ENV || "development"}`);
app.use(express.json());
app.use(cookieParser());
app.use(cors(options));
app.use(require("./Routes/index"));
// app.use("/", (req, res) => res.send("Hello World!"));

// Serve built React app
const __dirnamePath = path.resolve();
app.use(express.static(path.join(__dirnamePath, "../react/dist")));

// Health check for Render
app.get("/healthz", (_, res) => res.status(200).send("ok"));

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirnamePath, "../react/dist/index.html"));
});

server.listen(PORT, "0.0.0.0", () =>
  console.log(`Server is running on port ${PORT}.`)
);
