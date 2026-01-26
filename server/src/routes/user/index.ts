import express, { Router } from "express";
import manageRouter from "./manage";
import metaRouter from "./meta";

const userRouter: Router = express.Router();

userRouter.use("/", manageRouter);
userRouter.use("/:userId/meta", metaRouter);

export default userRouter;
