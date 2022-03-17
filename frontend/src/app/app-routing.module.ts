import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { UseremployeeComponent } from './components/useremployee/useremployee.component';
import { RtiComponent } from './components/rti/rti.component';
import { RtiEditComponent } from './components/rti-edit/rti-edit.component';
import { AddRtiComponent } from './components/add-rti/add-rti.component';
import { MyrtisComponent } from './components/myrtis/myrtis.component';


const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },

  { path: 'signin', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
//  { path: 'Dashboard/:pseudo', component: ProfileComponent },
  {path:'Employees', component: EmployeesComponent},
  {path:'useremployees', component: UseremployeeComponent},
  {path:'rtis', component: RtiComponent},
  {path:'Ajouter-rti',component: AddRtiComponent},
  { path: 'Dashboard/:username', component: MyrtisComponent },


];





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
