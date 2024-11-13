import express from "express";
import { downloadDataReport } from "./report.controller.js";

const router = express.Router();

router.get("/download-report", downloadDataReport);

export default router;
