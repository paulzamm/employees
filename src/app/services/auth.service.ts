import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { User } from '../interfaces/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private myappUrl: string;
  private myApiUrl: string;
  private myUrl: string;
  private token!: string;

  constructor(private http: HttpClient, private router: Router) {
    this.myappUrl = environment.apiUrl;
    this.myApiUrl = 'login/';
    this.myUrl = `${this.myappUrl}${this.myApiUrl}`;
  }

  login(user: User){
    return this.http.post<any>(this.myUrl, user).pipe(
      tap(response =>{
        if(response.token){
          this.setToken(response.token);
        }
      })
    );
  }

  private setToken(token: string): void{
    localStorage.setItem(this.token, token);
  }

  private getToken(): string | null{
    return localStorage.getItem(this.token);
  }

  isAuthenticated(): boolean{
    const token = this.getToken();
    if(!token){
      return false;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() < exp;
  }

  logout(): void{
    localStorage.removeItem(this.token);
    this.router.navigate(['/login']);
  }

  gethearders(){
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `${token}`
    });
  }
}
