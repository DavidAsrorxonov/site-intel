import express from "express";
import { getUser, login, register } from "../controllers/auth.controller.js";
import auth from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/user", auth, getUser);

export default authRouter;
