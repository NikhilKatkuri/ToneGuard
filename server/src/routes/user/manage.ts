import express, { Router } from "express";

const manageRouter: Router = express.Router();

manageRouter.get("/:userId");
manageRouter.put("/:userId");
manageRouter.delete("/:userId");

export default manageRouter;
