import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminComponent } from './pages/admin/admin.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UnauthorizesComponent } from './pages/unauthorizes/unauthorizes.component';
import { HomeComponent } from './pages/home/home.component';
//import { AuthGuard } from './guards/auth.guard';
import { Role } from './models/role.enum';
import { ChatboxComponent } from './pages/chatbox/chatbox.component';
import { AminCourseComponent } from './amin-course/amin-course.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},

  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'chatbox', component: ChatboxComponent},
  {path: 'register', component: RegisterComponent},

  { path: 'profile',
    component: ProfileComponent,
    // canActivate: [AuthGuard],
    // data: {roles: [Role.ADMIN, Role.USER]}
  },

  { path: 'admin',
    component: AdminComponent,
    // canActivate: [AuthGuard],
    // data: {roles: [Role.ADMIN]}
  },

  {path: '404', component: NotFoundComponent},
  {path: '401', component: UnauthorizesComponent},
  {
    path: 'admincourse',
    component: AminCourseComponent,



  
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) {
    this.router.errorHandler = (error: any) => {
      this.router.navigate(['/404']);
    };
  }
}
