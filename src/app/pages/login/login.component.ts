import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user.models";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  faUser = faUserCircle;
  errorMessage: string = "";

  constructor(private authenticationService: AuthenticationService, private router: Router, private tokenService: TokenService) { }

  ngOnInit(): void {
    if (this.authenticationService.currentUserValue?.id) {
      this.router.navigate(['/profile']);
      return;
    }
  }

  login() {
    this.authenticationService.login(this.user).subscribe( (response) => {
      console.log(response);
      // Stocker le token dans le localStorage
      this.tokenService.setToken(response.token);
      console.log('Logged in successfully.');

      const userRole = response.userRole;
      const userId = response.id;


      console.log(userRole);
      console.log(userId);

      // Stoker les informations de l'utilisateur dans le localStorage
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('userId', userId);


      if (userRole === 'USER') {
        this.router.navigate(['/profile']);
      } else if (userRole === 'ADMIN') {
        this.router.navigate(['/orgadmin']);
      }

      //this.router.navigate(['/profile']);
    },

     err => {
      this.errorMessage = 'Username or password is incorrect.';
      console.log(err);
    })
  }


}
