import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminComponent } from './pages/admin/admin.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UnauthorizesComponent } from './pages/unauthorizes/unauthorizes.component';
import { HomeComponent } from './pages/home/home.component';
import {HttpClientModule} from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { CourseSaveComponent } from './components/course-save/course-save.component';
import { CourseDeleteComponent } from './components/course-delete/course-delete.component';
import { authInterceptorProviders } from './interceptors/auth.interceptor';
import { ChatboxComponent } from './pages/chatbox/chatbox.component';
import { AminCourseComponent } from './amin-course/amin-course.component';
import { SidebarComponent } from './amin-course/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AdminComponent,
    NotFoundComponent,
    UnauthorizesComponent,
    HomeComponent,
    CourseSaveComponent,
    CourseDeleteComponent,
    ChatboxComponent,
    AminCourseComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
