const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const mongoURL =
  "mongodb+srv://congling00369:aether@cluster0.bv06s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => {
    console.log("mongoose ", error);
  });
require("./UserDetails");
const User = mongoose.model("UserInfo");

app.post("/register", async (req, res) => {
  const { username, useremail, userpassword } = req.body;
  const oldUser = await User.findOne({email: useremail});
  if(oldUser) res.send({data: "user already registered."})
  try {
    await User.create({
      name: username,
      email: useremail,
      password: userpassword,
    });
    res.send({ status: "ok", data: "user created" });
  } catch (error) {
    res.send({
      status: "error",
      data: error,
    });
  }
});
app.get("/", (req, res) => {
  res.send({ status: "started" });
});
app.listen(5001, () => {
  console.log("nodejs server is started.");
});
