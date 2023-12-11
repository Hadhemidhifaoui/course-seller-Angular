import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role.enum';
import { User } from 'src/app/models/user.models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent {
  users: User[] = [] = []
  errorMessage: string = "";

  showDeleteModal = false;
  userToDeleteId: string = '';
  isModalOpen = false;
  constructor(private userService: UserService, private http: HttpClient, private router : Router) {
    //this.getAllUser(Role.USER);
    this.loadUsersByRole(Role.USER);


  }
  openDeleteModal(userId: string) {
    this.userToDeleteId = userId;
    this.isModalOpen = true;

  }



  // Méthode pour fermer le modal de suppression
  closeDeleteModal() {
    this.isModalOpen = false;
    this.userToDeleteId = '';
  }

  confirmModal(): void {
    this.deleteUser();
    this.isModalOpen = false;
  }

  cancelModal(): void {
    this.isModalOpen = false;
  }
  deleteUser() {
    if (this.userToDeleteId) {
      this.userService.deleteUser(this.userToDeleteId).subscribe(
        (response) => {
          console.log(response); // Ceci devrait afficher "User deleted successfully."
          // Mettez à jour votre liste d'utilisateurs localement sans recharger la page.
          this.users = this.users.filter(user => user.id !== this.userToDeleteId);

          this.closeDeleteModal();
        },
        error => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }





  cancelDelete() {
    this.showDeleteModal = false;
  }

  loadUsersByRole(role: string): void {
    this.userService.getUsersByRole(role).subscribe(
      data => {
        this.users = data;
        console.log(data)

      console.log(this.users)
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }
  navigateToUpdatePage(id: string) {
    console.log('Navigating to update page with ID:', id);
    this.router.navigate(['/admincourse/utilisateur/update', id]);
  }

}
