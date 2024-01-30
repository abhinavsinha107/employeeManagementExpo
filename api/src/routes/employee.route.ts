import express from "express";
import {
  getAllEmployees,
  markAttendance,
  getAttendance,
} from "../controllers/employee.controller";

const router = express.Router();

router.get("/employees", getAllEmployees);
router.post("/attendance", markAttendance)
router.get("/attendance", getAttendance)

export default router;