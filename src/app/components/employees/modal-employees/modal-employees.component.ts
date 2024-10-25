import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { employee } from '../../../interfaces/employee';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideNativeDateAdapter } from '@angular/material/core';

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
    private _snackbar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public obEmployee: employee 
  ){
    if(obEmployee != null){
      this.accionTitle = 'Editar';
      this.accionButton = 'Actualizar';
    }
  }

  ngOnInit(): void {
    this.employeeForm = this.initForm();
  }
  
  initForm(){
    return this._formbuilder.group({
      employee_id: ['', [Validators.required, Validators.minLength(3)]],
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.minLength(10)]],
      hire_date: ['', [Validators.required]],
      job_id: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      commission_pct: [''],
      manager_id: [''],
      department_id: ['', [Validators.required]]
    });
  }
  
  saveEmployee(){
    console.log(this.employeeForm.value);
  }
}
