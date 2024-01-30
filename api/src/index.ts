import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route"
import employeeRoutes from "./routes/employee.route"
import Attendance from "./models/attendance.schema";

const PORT = 8000;
const app = express();

app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(bodyParser.json());

app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Hello World!");
});

mongoose.connect("mongodb+srv://abhinavsinha135:abhinavsinha135@cluster0.ffmcvjw.mongodb.net/?retryWrites=true&w=majority").then(() => console.log("Connected to MongoDB database")).catch((err) => console.log("Error Occurred while connecting to MongoDB", err));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/employee", employeeRoutes);





app.post("/attendance", async (req, res) => {
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
});

app.get("/attendance", async (req, res) => {
    try {
        const { date } = req.query;

        // Find attendance records for the specified date
        const attendanceData = await Attendance.find({ date: date });

        res.status(200).json(attendanceData);
    } catch (error) {
        res.status(500).json({ message: "Error fetching attendance data" });
    }
});

// app.get("/attendance-report-all-employees", async (req, res) => {
//     try {
//         const { month, year } = req.query;

//         console.log("Query parameters:", month, year);
//         // Calculate the start and end dates for the selected month and year
//         const startDate = moment(`${year}-${month}-01`, "YYYY-MM-DD")
//             .startOf("month")
//             .toDate();
//         const endDate = moment(startDate).endOf("month").toDate();

//         // Aggregate attendance data for all employees and date range
//         const report = await Attendance.aggregate([
//             {
//                 $match: {
//                     $expr: {
//                         $and: [
//                             {
//                                 $eq: [
//                                     { $month: { $dateFromString: { dateString: "$date" } } },
//                                     parseInt(req.query.month),
//                                 ],
//                             },
//                             {
//                                 $eq: [
//                                     { $year: { $dateFromString: { dateString: "$date" } } },
//                                     parseInt(req.query.year),
//                                 ],
//                             },
//                         ],
//                     },
//                 },
//             },

//             {
//                 $group: {
//                     _id: "$employeeId",
//                     present: {
//                         $sum: {
//                             $cond: { if: { $eq: ["$status", "present"] }, then: 1, else: 0 },
//                         },
//                     },
//                     absent: {
//                         $sum: {
//                             $cond: { if: { $eq: ["$status", "absent"] }, then: 1, else: 0 },
//                         },
//                     },
//                     halfday: {
//                         $sum: {
//                             $cond: { if: { $eq: ["$status", "halfday"] }, then: 1, else: 0 },
//                         },
//                     },
//                     holiday: {
//                         $sum: {
//                             $cond: { if: { $eq: ["$status", "holiday"] }, then: 1, else: 0 },
//                         },
//                     },
//                 },
//             },
//             {
//                 $lookup: {
//                     from: "employees", // Name of the employee collection
//                     localField: "_id",
//                     foreignField: "employeeId",
//                     as: "employeeDetails",
//                 },
//             },
//             {
//                 $unwind: "$employeeDetails", // Unwind the employeeDetails array
//             },
//             {
//                 $project: {
//                     _id: 1,
//                     present: 1,
//                     absent: 1,
//                     halfday: 1,
//                     name: "$employeeDetails.employeeName",
//                     designation: "$employeeDetails.designation",
//                     salary: "$employeeDetails.salary",
//                     employeeId: "$employeeDetails.employeeId",
//                 },
//             },
//         ]);

//         res.status(200).json({ report });
//     } catch (error) {
//         console.error("Error generating attendance report:", error);
//         res.status(500).json({ message: "Error generating the report" });
//     }
// });
