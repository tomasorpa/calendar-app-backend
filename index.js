const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");
require("dotenv").config();

const app = express();
dbConnection();

app.use(cors());
app.use(express.static("public"));

app.use(express.json());

//Routes AUTH

app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
//Routes AUTH

//Routes AUTH

app.get("/", (req, res) => {
  res.json({
    ok: true,
  });
});

app.listen(process.env.PORT);
