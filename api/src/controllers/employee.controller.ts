import express from "express";
import Employee from "../models/employee.schema";

export const getAllEmployees = async (req: express.Request, res: express.Response) => {
    try {
        const employees = await Employee.find({});
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve the employees" });
    }
}