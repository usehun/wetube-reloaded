import express from "express"; // 최신 코드
// const express = require("express") 위와 같은 코드

import morgan from "morgan"; // 로그 관리 미들웨어
import session from "express-session"; // 세션 미들 웨어

import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

const app = express();
const logger = morgan("dev");

// const logger = (req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// };

// const handleHome = (req, res) => {
//   return res.send("<h1>I still love you.</h1>");
// };

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
// app.get("/", logger, handleHome);

// app.use(logger);

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger); // 전체에 실행

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "Hello",
    resave: true,
    saveUninitialized: true,
  })
); // 라우터 앞에 코드를 작성

app.use((req, res, next) => {
  // console.log(req.headers);
  req.sessionStore.all((error, session) => {
    console.log(session);
    next();
  });
});

app.get("/add-one", (req, res, next) => {
  req.session.potato += 1;
  return res.send(`${req.session.id}`);
});

app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
