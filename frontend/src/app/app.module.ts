import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtService } from './shared/jwt.service';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import {RouterModule, Routes} from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHeaderInterceptor } from './shared/auth-header.interceptor';
import { EmployeesComponent } from './components/employees/employees.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UseremployeeComponent } from './components/useremployee/useremployee.component';
import { PipePipe } from './components/pipe.pipe';
import { RtiComponent } from './components/rti/rti.component';
import { RtiEditComponent } from './components/rti-edit/rti-edit.component';
import { AddRtiComponent } from './components/add-rti/add-rti.component';
import {v4 as uuidv4} from 'uuid';
import { AnnotationsComponent } from './components/annotations/annotations.component';

const routes: Routes = [

  {path:'user-profile/:rti_id', component:RtiEditComponent},
  {path:'user-profile/:rti_id/annotation/:rti_id', component: AnnotationsComponent}

 ];




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    EmployeesComponent,
    NavbarComponent,
    UseremployeeComponent,
    PipePipe,
    RtiComponent,
    RtiEditComponent,
    AddRtiComponent,
    AnnotationsComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
