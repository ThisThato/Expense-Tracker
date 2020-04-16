const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");

//Initialize express app
const app = express();

//Path to the config file(config.env)
dotenv.config({ path: "./config/config.env" });

//connect to the db Database
connectDB();

//routing
const transactions = require("./routes/transactions");

app.use("/api/v1/transactions", transactions);

app.use(express.json());

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

//Accessing the port in the config.env
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
