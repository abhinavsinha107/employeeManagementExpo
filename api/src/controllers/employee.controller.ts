import express from "express";
import Employee from "../models/employee.schema";
import Attendance from "../models/attendance.schema";

export const getAllEmployees = async (req: express.Request, res: express.Response) => {
    try {
        const employees = await Employee.find({});
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve the employees" });
    }
}

export const markAttendance = async (req: express.Request, res: express.Response) => {
  try {
    const { employeeId, employeeName, date, status } = req.body;
    const existingAttendance = await Attendance.findOne({ employeeId, date });
    if (existingAttendance) {
      existingAttendance.status = status;
      await existingAttendance.save();
      res.status(200).json(existingAttendance);
    } else {
      const newAttendance = new Attendance({
        employeeId,
        employeeName,
        date,
        status,
      });
      await newAttendance.save();
      res.status(200).json(newAttendance);
    }
  } catch (error) {
    res.status(500).json({ message: "Error submitting attendance" });
  }
};

export const getAttendance = async (req: express.Request, res: express.Response) => {
  try {
    const { date } = req.query;
    // Find attendance records for the specified date
    const attendanceData = await Attendance.find({ date: date });
    res.status(200).json(attendanceData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance data" });
  }
};