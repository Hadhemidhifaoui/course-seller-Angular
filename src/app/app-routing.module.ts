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
import { UtilisateursComponent } from './amin-course/utilisateurs/utilisateurs.component';
import { CoursComponent } from './amin-course/cours/cours.component';
import { TestsComponent } from './amin-course/tests/tests.component';
import { ReponsesComponent } from './amin-course/reponses/reponses.component';
import { UpdateUserComponent } from './amin-course/update-user/update-user.component';
import { DetailsUserComponent } from './amin-course/details-user/details-user.component';
import { AddCoursComponent } from './amin-course/add-cours/add-cours.component';
import { UpdateCoursComponent } from './amin-course/update-cours/update-cours.component';
import { AddTestComponent } from './amin-course/add-test/add-test.component';
import { TestDetailsComponent } from './amin-course/test-details/test-details.component';
import { AchatComponent } from './amin-course/achat/achat.component';

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
    children: [
      {
        path: '',
        component: UtilisateursComponent ,
      },
      { path: 'utilisateur/update/:id', component: UpdateUserComponent },
      { path: 'utilisateur/:userId', component: DetailsUserComponent },

      { path: 'cours', component: CoursComponent },
      { path: 'cours/add', component: AddCoursComponent },
      { path: 'cours/update/:id', component: UpdateCoursComponent },

      { path: 'tests', component: TestsComponent },
      { path: 'tests/add', component: AddTestComponent },
      { path: 'tests/test-details/:id', component: TestDetailsComponent },

      { path: 'reponses', component: ReponsesComponent },
      { path: 'achat', component: AchatComponent },


    ],
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
