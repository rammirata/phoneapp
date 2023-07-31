require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const session = require('express-session');

const app = express();

// Database
const DbConfig = require("./src/config/database");
mongoose.connect(DbConfig.uri, DbConfig.options);
let db = mongoose.connection;

db.once("open", () => {
  console.log("connection success DB...");
});

db.on("error", (err) => {
  console.log(err);
});

// Middleware
app.use(bodyParser.json());
app.use(express.json()); // To parse JSON request body
app.use((req, res, next) => {  // Initiate scope
  req.$scope = {};
  return next();
});
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

// Routes
app.use('/users', require('./src/routes/users.route'));
app.use('/auth', require('./src/routes/auth.route'));
app.use('/banks', require('./src/routes/banks.route'));

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack); // Log error stack trace to the console
  res.status(500).json({ error: error.message }); // Send back error message to client
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
