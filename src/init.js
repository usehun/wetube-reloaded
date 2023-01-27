import "./db"; // 데이터베이스
import "./models/Video"; // 모델
import "./models/User"; // 모델
import app from "./server";

const PORT = 4000;

const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
