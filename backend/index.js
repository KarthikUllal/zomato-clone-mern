const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./router/userRouter");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/zomato-db")
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

app.use("/api/user", router);

app.listen(8000, () => {
  console.log("App listening on port 8000");
});