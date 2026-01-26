import express, { Router } from "express";

const chatRouter: Router = express.Router();

chatRouter.post("/:userId/conversations/:chatId/messages");
chatRouter.get("/:userId/conversations");
chatRouter.get("/:userId/conversations/:chatId");
chatRouter.post("/:userId/conversations/:chatId");
chatRouter.delete("/:userId/conversations/:chatId");

export default chatRouter;
