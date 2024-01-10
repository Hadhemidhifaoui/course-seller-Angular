import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestWithCourseDTO } from 'src/app/models/TestWithCourseDTO.model';
import { Course } from 'src/app/models/course.model';
import { Test, TestForm } from 'src/app/models/test.model';
import { CourseService } from 'src/app/services/course.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {
  tests: Test[] = [];
  testsWithDetails: TestWithCourseDTO[] = [];
  courses: Course[] = [];
  showDeleteModal = false;
  testToDeleteId?: string ;
  courseTitle: string = '';
  courseId: string = '';
  isModalOpen = false;
  constructor(private testService: TestService , private router: Router, private courseService: CourseService ) {}
  openDeleteModal(testId: string): void {
    console.log('Opening modal for test ID:', testId);
    this.testToDeleteId = testId;
    this.isModalOpen = true;
  }


  closeDeleteModal() {
    this.isModalOpen = false;
    this.testToDeleteId = '';
  }

  confirmModal(): void {
    this.deleteTest();
    this.isModalOpen = false;
  }

  cancelModal(): void {
    this.isModalOpen = false;
  }
  deleteTest() {
    console.log('Deleting test with ID:', this.testToDeleteId);
    if (this.testToDeleteId) {
      this.testService.deleteTest(this.testToDeleteId).subscribe(
        () => {
          console.log('Test deleted successfully.');
          this.tests = this.tests.filter(test => test.id !== this.testToDeleteId);
          this.closeDeleteModal();
          location.reload();
        },
        error => {
          console.error('Error deleting test:', error);
        }
      );
    }
  }


  ngOnInit(): void {
    this.testService.getAllTestsWithDetails().subscribe(
      (data) => {
        this.testsWithDetails = data;
        console.log('Tests with details:', this.testsWithDetails);
      },
      (error) => {
        console.error('Error fetching tests with details', error);
      }
    );
  }
  cours() {
    this.courseService.getAllCourses().subscribe(
      (data: Course[]) => {
        this.courses = data;
        console.log('Courses:', this.courses); // Ajoutez ce log
      },
      (error) => {
        console.error('Error fetching courses', error);
      }
    );
  }

  viewTestDetails(testId: string): void {
    this.router.navigate(['admincourse/tests/test-details', testId]);
  }
  setCourseTitle(test: Test): string {
    console.log('Test ID:', test.id);
    console.log('Test Course ID:', test.course_id);

    const foundCourse = this.courses.find(course => course.id === test.course_id);
    console.log('Found Course:', foundCourse);

    return foundCourse ? foundCourse.title : '';
  }




  }
