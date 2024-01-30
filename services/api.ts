import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.1.102:8000' }),
    endpoints: (builder) => ({
        getAllEmployees: builder.query<Employee[], void>({
            query: () => `/api/employee/employees`
        }),
    }),
})

export const { useGetAllEmployeesQuery } = api;