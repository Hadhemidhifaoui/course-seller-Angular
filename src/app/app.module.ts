import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

import { RegisterComponent } from './pages/register/register.component';

import { AdminComponent } from './pages/admin/admin.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UnauthorizesComponent } from './pages/unauthorizes/unauthorizes.component';

import {HttpClientModule} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { authInterceptorProviders } from './interceptors/auth.interceptor';
import { ChatboxComponent } from './pages/chatbox/chatbox.component';
import { AminCourseComponent } from './amin-course/amin-course.component';
import { SidebarComponent } from './amin-course/sidebar/sidebar.component';
import { HeaderComponent } from './amin-course/header/header.component';
import { UtilisateursComponent } from './amin-course/utilisateurs/utilisateurs.component';
import { CoursComponent } from './amin-course/cours/cours.component';
import { ReponsesComponent } from './amin-course/reponses/reponses.component';
import { TestsComponent } from './amin-course/tests/tests.component';
import { UpdateUserComponent } from './amin-course/update-user/update-user.component';
import { DetailsUserComponent } from './amin-course/details-user/details-user.component';
import { DeleteConfirmationCourseModalComponent } from './amin-course/delete-confirmation-course-modal/delete-confirmation-course-modal.component';
import { AddCoursComponent } from './amin-course/add-cours/add-cours.component';
import { UpdateCoursComponent } from './amin-course/update-cours/update-cours.component';
import { AddTestComponent } from './amin-course/add-test/add-test.component';
import { TestDetailsComponent } from './amin-course/test-details/test-details.component';
import { DeleteConfirmationTestModalComponent } from './amin-course/delete-confirmation-test-modal/delete-confirmation-test-modal.component';
import { AchatComponent } from './amin-course/achat/achat.component';
import { DeleteDeleteConfirmationUserModalComponent } from './amin-course/delete-delete-confirmation-user-modal/delete-delete-confirmation-user-modal.component';
import { Base64ToSafeUrlPipe } from './amin-course/cours/base64-to-safe-url.pipe';
import { PdfComponent } from './amin-course/pdf/pdf.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ToastComponent } from './pages/toast/toast.component';
import { TestComponent } from './pages/test/test.component';
import { TsComponent } from './pages/ts/ts.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NotFoundComponent,
    UnauthorizesComponent,
     Base64ToSafeUrlPipe,
    ChatboxComponent,
    AminCourseComponent,
    SidebarComponent,
    HeaderComponent,
    UtilisateursComponent,
    CoursComponent,
    ReponsesComponent,
    TestsComponent,
    UpdateUserComponent,
    DetailsUserComponent,
    DeleteConfirmationCourseModalComponent,
    AddCoursComponent,
    UpdateCoursComponent,
    AddTestComponent,
    TestDetailsComponent,
    DeleteConfirmationTestModalComponent,
    AchatComponent,
    DeleteDeleteConfirmationUserModalComponent,
    PdfComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    LayoutComponent,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
    ToastComponent,
   // AchatComponent,
    TestComponent,
    TsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    //ToastrModule.forRoot()
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
