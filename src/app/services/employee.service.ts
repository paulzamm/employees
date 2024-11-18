import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { employeeResponse } from '../interfaces/employee-Response';
import { AuthService } from './auth.service';
import { employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private myappUrl: string;
  private myApiUrl: string;
  private myUrl: string;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.myappUrl = environment.apiUrl;
    this.myApiUrl = 'employees/';
    this.myUrl = `${this.myappUrl}${this.myApiUrl}`;
  }

  getEmployees(): Observable<employeeResponse[]>{
    const header = this.auth.gethearders();
    return this.http.get<employeeResponse[]>(this.myUrl, {headers: header});
  }

  getEmployee(id: number): Observable<employeeResponse>{
    const header = this.auth.gethearders();
    return this.http.get<employeeResponse>(`${this.myUrl}${id}`, {headers: header});
  }

  createEmployee(employee: employee): Observable<employee>{
    const header = this.auth.gethearders();
    return this.http.post<employee>(this.myUrl, employee, {headers: header});
  }

  updateEmployee(employee: employee): Observable<employee>{
    const header = this.auth.gethearders();
    return this.http.put<employee>(`${this.myUrl}${employee.employee_id}`, employee, {headers: header});
  }

  deleteEmployee(id: number): Observable<employee>{
    const header = this.auth.gethearders();
    return this.http.delete<employee>(`${this.myUrl}${id}`, {headers: header});
  }
}
