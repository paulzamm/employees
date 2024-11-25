import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalEmployeesComponent } from './modal-employees/modal-employees.component';
import { employeeResponse } from '../../interfaces/employee-Response';
import { EmployeeService } from '../../services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  displayedColumns: string[] = ['nombre', 'apellido','email', 'celular', 'contratacion', 'trabajo', 'salario', 'comision', 'jefe', 'departamento', 'acciones'];
  dataListaEmployees = new MatTableDataSource<employeeResponse>();

  constructor(private _employeeService: EmployeeService, private _dialog: MatDialog
    ,private _snackBar: MatSnackBar
  ) {}

  
  
  ngOnInit(): void {
    this.getEmployees();
  }

  filterTable(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaEmployees.filter = filterValue.trim().toLowerCase();
  }

  getEmployees(){
    this._employeeService.getEmployees().subscribe({
      next: (data) =>{
        this.dataListaEmployees.data = data.map((_employee: any) => ({
          ..._employee,
          hire_date: moment(_employee.hire_date).format('DD-MM-YYYY')
        }));
      },
      error: () =>{
        this._snackBar.open('Error al obtener los datos', '', {
          duration: 2000
        }); 
      }
    });
  }

  createEmployee(){
    this._dialog.open(ModalEmployeesComponent, {
      width: '700px',
      height: '550px',
      disableClose: true
    }).afterClosed().subscribe(result => {
      if(result === 'true'){
        this.getEmployees();
      }
    });
  }

  updateEmployee(_employee: employeeResponse){
    this._dialog.open(ModalEmployeesComponent, {
      width: '700px',
      height: '550px',
      disableClose: true,
      data: _employee
    }).afterClosed().subscribe(result => {
      if(result === 'true'){
        this.getEmployees();
      }
    });
  }

  deleteEmployee(_employee: employeeResponse){
    Swal.fire({
      title: '¿Estás seguro de eliminar el empleado?',
      text: 'Esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this._employeeService.deleteEmployee(_employee.employee_id).subscribe({
          next: () => {
            this.getEmployees();
            this._snackBar.open('Empleado eliminado', '', {
              duration: 2000
            });
          },
          error: () => {
            this._snackBar.open('Error al eliminar el empleado', '', {
              duration: 2000
            });
          }
        });
      }
    });
  }

  exportEmployees(){
    this._employeeService.exportData().subscribe(
      (response) =>{
        const blob = new Blob([response], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data_employees.csv';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.log('Error al exportar los empleados', error);
        this._snackBar.open('Error al exportar los datos', '', {
          duration: 2000
        });
      }
    );
  }

  importEmployees(event: any){
    const file = event.target.files[0];
    if(file){
      this._employeeService.importData(file).subscribe({
        next: () => {
          this.getEmployees();
          this._snackBar.open('Datos importados exitosamente', '', {
            duration: 2000
          });
        },
        error: (error) => {
          console.log('Error al importar los empleados', error);
          this._snackBar.open('Error al importar los datos', '', {
            duration: 2000
          });
        }
      });
    }else{
      this._snackBar.open('No se ha seleccionado un archivo', '', {
        duration: 2000
      });
    }
  }
}
