import express from "express";
import {addEmployee} from "../controllers/auth.controller"

const router = express.Router();

router.post("/addEmployee", addEmployee)

export default router;