import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-add-cours',
  templateUrl: './add-cours.component.html',
  styleUrls: ['./add-cours.component.css']
})
export class AddCoursComponent {
  course: Course = new Course();



  selectedImage!: File  ;

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit() {}



  handleImageInput(event: any): void {
    this.selectedImage = event.target.files[0];
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.course.image = e.target.result;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }



/*   onSubmit() {
    if (this.selectedImage !== null && this.selectedImage !== undefined) {
      this.courseService.saveCourse(
        this.course.title,
        this.course.duree,
        this.course.lien,
        this.course.price,
        this.selectedImage
      ).subscribe(
        (response) => {
          console.log('Cours ajouté avec succès:', response);
          this.router.navigate(['/admincourse/cours']);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du cours:', error);
        }
      );
    } else {
      console.error('Veuillez sélectionner une image pour le cours.');
    }
  } */

  onSubmit() {
    // Ensure that selectedImage is a File
    const image: File = this.selectedImage;

    // Update the model with the image property
    this.course.image = image;

    this.courseService.saveCourse(this.course.title, this.course.duree, this.course.lien, this.course.price, this.course.image)
      .subscribe(
        (response) => {
          console.log('Cours ajouté avec succès:', response);
          this.router.navigate(['/admincourse/cours']);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du cours:', error);
          // Handle error as needed
        }
      );
  }




      }
