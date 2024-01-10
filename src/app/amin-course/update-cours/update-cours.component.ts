import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { Status } from 'src/app/models/status.enum';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-update-cours',
  templateUrl: './update-cours.component.html',
  styleUrls: ['./update-cours.component.css']
})
export class UpdateCoursComponent {
  course: Course = {
    id: '',
    title: '',
    duree: '',
    lien : '',

    createTime: new Date(),
    price: 0.0,
    status: Status.Available,


    image: undefined!

  };
  selectedImage: File | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService:CourseService,

  ) {}

  ngOnInit() {
    const courseId = this.route.snapshot.params['id'];
    this.courseService.getCourseById(courseId).subscribe(
      (course) => {
        this.course = course;

      },
      (error) => {
        console.error('Erreur lors de la récupération du cours :', error);
      }
    );
  }


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




  onSubmit() {
    const courseId = this.route.snapshot.params['id'];


    if (!courseId) {
      console.error('Invalid courseId');
      return;
    }

    this.courseService.updateCourse(
      courseId,
      this.course.title,
      this.course.duree,
      this.course.lien,
      this.course.price,
      this.selectedImage
    ).subscribe(
      (response) => {
        console.log('Cours mis à jour avec succès:', response);
        this.router.navigate(['/admincourse/cours']);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du cours:', error);
      }
    );
  }

}
