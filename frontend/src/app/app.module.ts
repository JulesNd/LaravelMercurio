import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtService } from './shared/jwt.service';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {Location} from '@angular/common';
import Swal from 'sweetalert2';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import {RouterModule, Routes} from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpEvent, HttpEventType  } from '@angular/common/http';
import { AuthHeaderInterceptor } from './shared/auth-header.interceptor';
import { EmployeesComponent } from './components/employees/employees.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UseremployeeComponent } from './components/useremployee/useremployee.component';
import { PipePipe } from './components/pipe.pipe';
import { RtiComponent } from './components/rti/rti.component';
import { RtiEditComponent } from './components/rti-edit/rti-edit.component';
import { AddRtiComponent } from './components/add-rti/add-rti.component';
import {v4 as uuidv4} from 'uuid';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { AnnotationsComponent } from './components/annotations/annotations.component';
import { MyrtisComponent } from './components/myrtis/myrtis.component';
import { LoadingComponent } from './components/loading/loading.component';
import { AdminComponent } from './components/admin/admin.component';
import { ClipboardModule } from 'ngx-clipboard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditorModule } from "@tinymce/tinymce-angular";

const routes: Routes = [

  //{path:'rti/:nom/:annotation_id', component:RtiEditComponent},
  {path:'rti/:rti_id', component:RtiEditComponent},

//  {path:'rti/'+'abc'+':annotation_id', component:RtiEditComponent},

  //{path:'rti/:nom/:annotation_id/annotation', component: AnnotationsComponent},
  {path:'rti/:rti_id/annotation', component: AnnotationsComponent},

  { path: 'Users', component: ProfileComponent },
  { path: 'loading', component: LoadingComponent },






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
    MyrtisComponent,
    LoadingComponent,
    AdminComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ClipboardModule,
    NgbModule,
    EditorModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true
    },
    {provide: LocationStrategy, useClass: HashLocationStrategy}


  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
