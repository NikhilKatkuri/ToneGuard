import express, { Router } from "express";

const authRouter: Router = express.Router();
authRouter.post("/register");
authRouter.post("/login");
authRouter.post("/logout");
authRouter.get("/me");
authRouter.post("/refresh");

export default authRouter;
