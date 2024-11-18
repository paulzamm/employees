import { department } from "./department";
import { employee } from "./employee";
import { job } from "./job";

export interface employeeResponse {
    employee_id: number,
    first_name: string,
    last_name: string,
    email: string,
    phone_number: string,
    hire_date: string,
    salary: number,
    commission_pct: number,
    department: department,
    job: job,
    manager: employee
}