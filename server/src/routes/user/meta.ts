import express, { Router } from "express";

const metaRouter: Router = express.Router();

metaRouter.get("/api-keys");
metaRouter.post("/api-keys");
metaRouter.put("/api-keys");
metaRouter.delete("/api-keys");

metaRouter.get("/instructions/:instructionId");
metaRouter.post("/instructions");
metaRouter.put("/instructions/:instructionId");
metaRouter.delete("/instructions/:instructionId");

export default metaRouter;
