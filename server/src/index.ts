import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/database";
import routes from "./routes";
import { errorHandler, notFound, requestLogger } from "./middleware";

const app = express();
const port = process.env.PORT || 4000;

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(requestLogger);

// Routes
app.use("/api", routes);

// Root route
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "ToneGuard Server API is running!",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const server = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server : http://localhost:${port}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`API : http://localhost:${port}/api`);
      console.log(`Health : http://localhost:${port}/api/health`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

server();
