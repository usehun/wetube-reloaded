import express from "express"; // 최신 코드
// const express = require("express") 위와 같은 코드

const PORT = 4000;

const app = express();

const handleHome = (req, res) => {
  return res.send("<h1>I still love you.</h1>");
};

// function handleHome(req, res) {
//   return res.send("<h1>I still love you.</h1>");
// }

const handleLogin = (req, res) => {
  return res.send("Login here");
};

app.get("/", handleHome);
app.get("/login", handleLogin);

// app.get("/", (req, res) => {
//   return res.end();
// });

// app.get("/login", (req, res) => {
//   return res.send("Login here.");
// });

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
