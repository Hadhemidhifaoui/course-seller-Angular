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
    // Récupérer l'ID de l'utilisateur depuis les paramètres de l'URL
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');

      // Vérifier si l'ID est défini avant de faire la requête
      if (this.userId) {
        // Appeler la méthode getUser avec l'ID de l'utilisateur
        this.userService.getUser(this.userId).subscribe(
          data => {
            // Traiter la réponse de la requête HTTP
            this.user = data;
          },
          error => {
            // Traiter les erreurs de requête HTTP
            console.error('Erreur lors de la requête getUser:', error);
          }
        );
      } else {
        console.error('ID de l\'utilisateur non défini.');
      }
    });
  }
}
