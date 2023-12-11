// test-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Test, TestForm } from 'src/app/models/test.model';
import { TestService } from 'src/app/services/test.service';


@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css']
})
export class TestDetailsComponent implements OnInit {
  testId!: string;
  test!: Test ;

  constructor(private route: ActivatedRoute, private testService: TestService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.testId = params['id'];
      this.loadTestDetails();
    });
  }

  loadTestDetails(): void {

    this.testService.getTestDetails(this.testId).subscribe(
      (data) => {
        this.test = data;
        console.log(data)
      },
      (error) => {
        console.error('Error fetching test details', error);
      }
    );
  }
}
