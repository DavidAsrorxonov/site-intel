import express from "express";
import cors from "cors";

import "dotenv/config";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.route.js";

connectDB();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server running");
});
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
