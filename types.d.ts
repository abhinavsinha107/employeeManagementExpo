interface Employee {
    employeeId: string;
    employeeName: string;
    designation: string;
    joiningDate: string;
    dateOfBirth: string;
    salary: number;
    activeEmployee: boolean;
    phoneNumber: string;
    address: string;
}

interface Attendance {
  employeeId: string;
  employeeName: string;
  date: string;
  status: string;
}