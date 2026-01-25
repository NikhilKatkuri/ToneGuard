import express, { Router } from "express";
import userDBHandler from "../controllers";

const router: Router = express.Router();

// Health check route
router.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running!",
    timestamp: new Date().toISOString(),
  });
});

router.post("/user-db", userDBHandler);

export default router;
