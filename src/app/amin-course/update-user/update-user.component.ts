import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  user: any = {
    id: '',
    name: '',
    username: '',
    phone: '',
    adresse: '',
    status : '',
    createTime: new Date(),
    image: undefined!
  };
  selectedImage: File | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.params['id'];
    this.userService.getUser(userId).subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error);
      }
    );
  }

  handleImageInput(event: any): void {
    this.selectedImage = event.target.files[0];
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.image = e.target.result;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  onSubmit() {
    const userId = this.route.snapshot.params['id'];

    // Guard clause to check if userId is present
    if (!userId) {
      console.error('Invalid userId');
      return;
    }

    this.userService.updateUser(
      userId,
      this.user.name,
      this.user.username,
      this.user.phone,
      this.user.adresse,
      this.user.status,
      this.selectedImage
    ).subscribe(
      (response) => {
        console.log('Utilisateur mis à jour avec succès:', response);
        this.router.navigate(['/admincourse']);  // Modifier la redirection selon vos besoins
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        // Ajoutez un message d'erreur personnalisé ou une redirection vers une page d'erreur
      }
    );
  }
}
