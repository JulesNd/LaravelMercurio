import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { UseremployeeComponent } from './components/useremployee/useremployee.component';
import { RtiComponent } from './components/rti/rti.component';
import { RtiEditComponent } from './components/rti-edit/rti-edit.component';


const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'user-profile', component: ProfileComponent },
  {path:'Employees', component: EmployeesComponent},
  {path:'useremployees', component: UseremployeeComponent},
  {path:'rtis', component: RtiComponent},

];





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
