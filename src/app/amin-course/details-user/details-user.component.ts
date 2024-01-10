import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent implements OnInit {
  userId: string | null = null; 
  user: any;

  constructor(private route: ActivatedRoute, private userService: UserService ) { }

  ngOnInit() {
  
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');
      if (this.userId) {
        this.userService.getUser(this.userId).subscribe(
          data => {
            this.user = data;
          },
          error => {

            console.error('Erreur lors de la requête getUser:', error);
          }
        );
      } else {
        console.error('ID de l\'utilisateur non défini.');
      }
    });
  }
}
