import { Component } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import {  OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  tests: any; // Assurez-vous que cela correspond à la structure de données de votre API

  constructor(private testService: TestService) {}

  ngOnInit() {
    this.getTestByCourseId(1); // Remplacez YOUR_COURSE_ID par l'ID de votre cours
  }

  getTestByCourseId(courseId: any) {
    this.testService.getallTestsByCourseId(courseId).subscribe((tests) => {
      this.tests = tests;
      console.log(this.tests); // Pour le débogage
    });
  }
}
