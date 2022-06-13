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
import {MatDialogModule} from '@angular/material/dialog';
import { EditorModule } from "@tinymce/tinymce-angular";
import { UploadComponent } from './components/upload/upload.component';
import { DraftuploadComponent } from './components/draftupload/draftupload.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { PrivatePageComponent } from './components/private-page/private-page.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AuthGuard } from './shared/auth.guard';
import { MesDossiersComponent } from './components/mes-dossiers/mes-dossiers.component';
import { EditRtiFormComponent } from './components/edit-rti-form/edit-rti-form.component';
import { RtiModalComponent } from './components/rti-modal/rti-modal.component';
import { AllRtisComponent } from './components/all-rtis/all-rtis.component';
import { HomeComponent } from './components/home/home.component';
import { EmbedComponent } from './components/embed/embed.component';
import { EmbedLinkComponent } from './components/embed-link/embed-link.component';

const routes: Routes = [

  //{path:'rti/:nom/:annotation_id', component:RtiEditComponent},
  {path:'rti/:rti_id', component:RtiEditComponent},
  {path:'rti/:rti_id/charger-mon-rti', component:DraftuploadComponent},
  {path:'popup/rti/:rti_id', component:RtiModalComponent},

  {path:'all', component:AllRtisComponent},
  {path:'rti/:rti_id/embed', component:EmbedComponent},

//  {path:'rti/'+'abc'+':annotation_id', component:RtiEditComponent},

  //{path:'rti/:nom/:annotation_id/annotation', component: AnnotationsComponent},
  {path:'rti/:rti_id/annotation', component: AnnotationsComponent},

  { path: 'Users', component: ProfileComponent },
  { path: 'loading', component: LoadingComponent },
  { path: 'Mes-dossiers', component: MesDossiersComponent },
  {path: 'home', component: HomeComponent},





 ];




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
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
    UploadComponent,
    DraftuploadComponent,
    PrivatePageComponent,
    UserProfileComponent,
    MesDossiersComponent,
    EditRtiFormComponent,
    RtiModalComponent,
    AllRtisComponent,
    HomeComponent,
    EmbedComponent,
    EmbedLinkComponent,
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
    NgxDropzoneModule,
    BrowserAnimationsModule,
    MatDialogModule,

  ],
  providers: [
    AuthGuard,
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
