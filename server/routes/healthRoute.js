import express from "express";
import mongoose from "mongoose";

const healthRoute = express.Router();

healthRoute.get("/", async (req, res) => {
  const bdStates = ["disconnected", "connected", "connecting", "diconnecting"];
  const dbStatus = bdStates[mongoose.connection.readyStates];

  let dbOk = false;
  if (mongoose.connection.readyState === 1) {
    try {
      await mongoose.connection.db.admin().ping();
      dbOk = true;
    } catch {
      dbOk = false;
    }
  }

  res.status(dbOk ? 200 : 503).json({
    success: dbOk,
    express: "running",
    database: dbOk ? "Server connected" : dbStatus,
    uptime: process.uptime(),
    timeStamp: new Date().toISOString(),
  });
});

export default healthRoute;
