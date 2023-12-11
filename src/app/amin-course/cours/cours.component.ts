import { Component, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent {
  courseList: Array<Course> = [];
  selectedCourse!: Course ;
  errorMessage: string = "";

  showDeleteModal = false;
  courseToDeleteId: string = '';
  isModalOpen = false;
  constructor(private courseService: CourseService, private sanitizer: DomSanitizer, private router : Router) {}
  openDeleteModal(courseId: string) {
    this.courseToDeleteId = courseId;
    this.isModalOpen = true;

  }

  getSanitizedImageUrl(base64String: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + base64String);
  }

  // Méthode pour fermer le modal de suppression
  closeDeleteModal() {
    this.isModalOpen = false;
    this.courseToDeleteId = '';
  }

  confirmModal(): void {
    this.deleteCourse();
    this.isModalOpen = false;
  }

  cancelModal(): void {
    this.isModalOpen = false;
  }

  deleteCourse() {
    if (this.courseToDeleteId) {
      this.courseService.deleteCourse(this.courseToDeleteId).subscribe(
        () => {
          console.log("yes")
          location.reload();

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


  navigateToUpdatePage(id: string) {
    console.log('Navigating to update page with ID:', id);
    this.router.navigate(['/admincourse/cours/update', id]);
  }



  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe(data => {
      this.courseList = data;
    });
  }











}
