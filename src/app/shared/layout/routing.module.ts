import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from '../../components/employees/employees.component';
import { HomeComponent } from '../../components/home/home.component';
import { LayoutComponent } from './layout.component';
import { authGuard } from '../../guards/auth.guard';

const routes: Routes = [
  { path: '',
    component: LayoutComponent,
    children: [
      { path: 'employees', component: EmployeesComponent, canActivate: [authGuard] },
      { path: 'home', component: HomeComponent, canActivate: [authGuard] },
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: '**', pathMatch: 'full', redirectTo: 'home' } 
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
