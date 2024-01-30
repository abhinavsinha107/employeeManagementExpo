import express from "express";
import {getAllEmployees} from "../controllers/employee.controller"

const router = express.Router();

router.get("/employees", getAllEmployees);

export default router;