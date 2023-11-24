import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private authenticationService: AuthenticationService, private router: Router, private tokenService: TokenService) {
  }
logout(){
  this.authenticationService.logOut();

  localStorage.removeItem('userRole');
  localStorage.removeItem('userId');
  this.tokenService.removeToken();
  this.router.navigate(["/login"])
}
}
