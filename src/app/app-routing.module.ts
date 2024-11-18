import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authenticatedGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [authenticatedGuard] },
  { path: 'pages', loadChildren: () => import('./shared/layout/routing.module').then(m => m.RoutingModule) },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
