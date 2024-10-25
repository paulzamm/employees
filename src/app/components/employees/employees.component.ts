import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalEmployeesComponent } from './modal-employees/modal-employees.component';
import { employee } from '../../interfaces/employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  employees: employee[] = [];
  displayedColumns: string[] = ['nombre', 'apellido','email', 'celular', 'contratacion', 'trabajo', 'salario', 'comision', 'jefe', 'departamento', 'acciones'];


  constructor(private _employeeService: EmployeeService, private _dialog: MatDialog) { }

  createEmployee(){
    this._dialog.open(ModalEmployeesComponent, {
      width: '700px',
      height: '550px',
      disableClose: true
    })
  }
  
}
