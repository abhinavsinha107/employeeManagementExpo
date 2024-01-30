import express from "express";
import Employee from "../models/employee.schema";

export const addEmployee = async (req: express.Request, res: express.Response) => {
    try {
        const {
            employeeName,
            employeeId,
            designation,
            phoneNumber,
            dateOfBirth,
            joiningDate,
            activeEmployee,
            salary,
            address,
        } = req.body;

        //create a new Employee
        const newEmployee = new Employee({
            employeeName,
            employeeId,
            designation,
            phoneNumber,
            dateOfBirth,
            joiningDate,
            activeEmployee,
            salary,
            address,
        });

        await newEmployee.save();

        res
            .status(201)
            .json({ message: "Employee saved successfully", employee: newEmployee });
    } catch (error) {
        console.log("Error creating employee", error);
        res.status(500).json({ message: "Failed to add an employee" });
    }
}