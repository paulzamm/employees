import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { employeeResponse } from '../../../interfaces/employee-Response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideNativeDateAdapter } from '@angular/material/core';
import { EmployeeService } from '../../../services/employee.service';
import moment from 'moment';
import { employee } from '../../../interfaces/employee';

@Component({
  selector: 'app-modal-employees',
  templateUrl: './modal-employees.component.html',
  styleUrl: './modal-employees.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalEmployeesComponent implements OnInit{
  employeeForm!: FormGroup;
  accionTitle: string = 'Agregar';
  accionButton: string = 'Guardar';

  constructor(private _formbuilder: FormBuilder, private modalActual: MatDialogRef<ModalEmployeesComponent>,
    private _snackbar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public obEmployee: employeeResponse, private _employeeService: EmployeeService
  ){
    if(obEmployee != null){
      this.accionTitle = 'Editar';
      this.accionButton = 'Actualizar';
    }
  }

  ngOnInit(): void {
    this.employeeForm = this.initForm();
    if(this.obEmployee != null){
      this.setDatos(this.obEmployee);
    }
  }
  
  initForm(){
    return this._formbuilder.group({
      employee_id: ['', Validators.required],
      first_name: [''],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      phone_number: [''],
      hire_date: ['', Validators.required],
      job_id: ['', Validators.required],
      salary: [''],
      commission_pct: [''],
      manager_id: [''],
      department_id: ['']
    });
  }
  
  saveEmployee(){
    const _employee: employee = {
      employee_id: this.employeeForm.value.employee_id,
      first_name: this.employeeForm.value.first_name,
      last_name: this.employeeForm.value.last_name,
      email: this.employeeForm.value.email,
      phone_number: this.employeeForm.value.phone_number,
      hire_date: this.employeeForm.value.hire_date,
      job_id: this.employeeForm.value.job_id,
      salary: this.employeeForm.value.salary,
      commission_pct: this.employeeForm.value.commission_pct ? this.employeeForm.value.commission_pct : null,
      manager_id: this.employeeForm.value.manager_id ? this.employeeForm.value.manager_id : null,
      department_id: this.employeeForm.value.department_id ? this.employeeForm.value.department_id : null
    }

    if(this.obEmployee == null){
      this._employeeService.createEmployee(_employee).subscribe({
        next: () => {
          this._snackbar.open('Empleado creado con éxito', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          this.modalActual.close('true');
        },
        error: (error) => {
          this._snackbar.open(error.error, 'Close', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      });
    }else{
      this._employeeService.updateEmployee(_employee).subscribe({
        next:() => {
          this._snackbar.open('Empleado actualizado con éxito', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          this.modalActual.close('true');
        },
        error: (error) => {
          this._snackbar.open(error.error, 'Close', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      });
    }
  }

  setDatos(_employee: employeeResponse){
    this.employeeForm.patchValue({
      employee_id: _employee.employee_id,
      first_name: _employee.first_name,
      last_name: _employee.last_name,
      email: _employee.email,
      phone_number: _employee.phone_number,
      hire_date: moment(_employee.hire_date, 'DD-MM-YYYY').toDate(),
      job_id: _employee.job.job_id,
      salary: _employee.salary,
      commission_pct: _employee.commission_pct,
      manager_id: _employee.manager? _employee.manager.employee_id : '',
      department_id: _employee.department? _employee.department.department_id : ''
    });
  }
}
