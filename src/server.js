import express from "express"; // 최신 코드
// const express = require("express") 위와 같은 코드

import morgan from "morgan";

const PORT = 4000;

const app = express();

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const handleHome = (req, res) => {
  return res.send("<h1>I still love you.</h1>");
};

// 위와 아래는 같은 코드
// function handleHome(req, res) {
//   return res.send("<h1>I still love you.</h1>");
// }

// const privateMiddleware = (req, res, next) => {
//   const url = req.url;

//   if (url === "/protected") {
//     return res.send("<h1>Not Allowed</h1>");
//   }
//   console.log("Allow you may continue.");
//   next();
// };

// const handleLogin = (req, res) => {
//   return res.send("Login here");
// };

// const handleProtected = (req, res) => {
//   return res.send("Welcome to the private lounge.");
// };

// app.use(logger);  // 전체에 실행
// app.use(privateMiddleware);

// app.get("/login", handleLogin);
// app.get("/protect", handleProtected);

// 밑에 코드는 화살표 함수 사용
// app.get("/", (req, res) => {
//   return res.end();
// });

// app.get("/login", (req, res) => {
//   return res.send("Login here.");
// });

const loggerMiddleware = morgan("dev");

app.use(loggerMiddleware);
app.get("/", logger, handleHome);

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
