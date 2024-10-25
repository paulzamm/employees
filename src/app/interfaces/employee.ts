import { department } from "./department";
import { job } from "./job";
import { manager } from "./manager";

export interface employee {
    employee_id: number,
    first_name: string,
    las_name: string,
    email: string,
    phone_number: string,
    hire_date: string,
    salary: number,
    commission_pct: number,
    department: department,
    job: job,
    manager: manager
}