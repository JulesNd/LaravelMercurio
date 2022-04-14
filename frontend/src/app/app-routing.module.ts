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
import { UserProfileComponent } from './components/user-profile/user-profile.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
//  { path: 'Dashboard/:pseudo', component: ProfileComponent },
  {path:'rtis', component: RtiComponent},
  {path:'Ajouter-rti',component: AddRtiComponent},
  { path: 'Users/:username', component: MyrtisComponent },
  {path: 'mon-profile/:id', component: UserProfileComponent},

];





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
