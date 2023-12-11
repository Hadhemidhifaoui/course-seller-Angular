import {Component, OnInit, ViewChild} from '@angular/core';
import {Course} from "../../models/course.model";
import {CourseService} from "../../services/course.service";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  courseList: Array<Course> = [];
  selectedCourse: Course = new Course();

  errorMessage: string = "";

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe(data => {
      this.courseList = data;
    });
  }



  saveCourseWatcher(course: Course) {
    let itemIndex = this.courseList.findIndex(item => item.id === course.id);

    if (itemIndex !== -1) {
      this.courseList[itemIndex] = course;
    } else {
      this.courseList.push(course);
    }
  }

  // deleteCourse() {
  //   let itemIndex = this.courseList.findIndex(item => item.id === this.selectedCourse.id);

  //   this.courseService.deleteCourse(this.selectedCourse).subscribe(data => {
  //     this.courseList.splice(itemIndex, 1);
  //   }, err => {
  //     this.errorMessage = 'Unexpected error occurred.';
  //     console.log(err);
  //   })
  // }

}
