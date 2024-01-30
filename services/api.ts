import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.0.218:8000" }),
  endpoints: (builder) => ({
    getAllEmployees: builder.query<Employee[], void>({
      query: () => `/api/employee/employees`,
    }),
    registerEmployee: builder.mutation({
      query: (body: {
        employeeName: string;
        employeeId: string;
        designation: string;
        phoneNumber: string;
        dateOfBirth: string;
        joiningDate: string;
        activeEmployee: boolean;
        salary: number;
        address: string;
      }) => {
        return {
          url: "/api/auth/addEmployee",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useGetAllEmployeesQuery, useRegisterEmployeeMutation } = api;