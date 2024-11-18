import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  user!: User;

  constructor(private _formBuilder: FormBuilder, private auth: AuthService,
    private router:Router, private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.initForm();
  }

  initForm():FormGroup{
    return this._formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]]
    });
  }

  login():void{
    this.user = this.loginForm.value;
    this.auth.login(this.user).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Login',
          text: 'Login successfully',
          showConfirmButton: false,
          timer: 800
        });
        this.router.navigate(['/pages/home']);
      },
      error: (error) =>{
        this._snackBar.open(error.error, 'Close', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    });
  }
}
