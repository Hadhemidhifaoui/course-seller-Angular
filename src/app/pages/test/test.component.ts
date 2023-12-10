import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import { AnswerService } from 'src/app/services/answer.service';
import { Test, Question, Suggestion } from 'src/app/models/test.model'; 


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  tests: any; // Remplacez par votre type de données réel
  userconnect=JSON.parse(localStorage.getItem("currentUser")!)

  constructor(private testService: TestService, private answerService: AnswerService) {}

  ngOnInit() {
    this.getTestByCourseId(1); // Remplacez par l'ID de votre cours
  }

  getTestByCourseId(courseId: number) {
    this.testService.getallTestsByCourseId(courseId).subscribe((tests) => {
      this.tests = tests;
      this.initializeSelectedOptions();
    });
  }

  initializeSelectedOptions() {
    this.tests.forEach((test: Test) => { // Ajoutez le type Test ici
      test.questions.forEach((question: Question) => { // Ajoutez le type Question ici
        question.selectedOptions = [];
      });
    });
  }
  
  updateSelectedOptions(event: any, option: string, questionId: number): void {
    const question = this.findQuestionById(questionId);
    if (event.target.checked) {
      question.selectedOptions.push(option);
    } else {
      const index = question.selectedOptions.indexOf(option);
      if (index !== -1) {
        question.selectedOptions.splice(index, 1);
      }
    }
  }

  submitAnswer(testId: number, questionId: number): void {
    const userConnect = localStorage.getItem("currentUser");
   
    if (!this.userconnect.id) {
      console.error('UserId is not found in localStorage');
      return;
    }

    const question = this.findQuestionById(questionId);
    const answerData = {
      userId: Number(this.userconnect.id),
      courseId: testId,
      questionId: questionId,
      selectedOptions: question.selectedOptions
    };

    this.answerService.submitAnswer(answerData).subscribe(
      response => console.log('Réponse soumise avec succès', response),
      error => console.error('Erreur lors de la soumission de la réponse', error)
    );
  }

  private findQuestionById(questionId: number) {
    for (const test of this.tests) {
      for (const question of test.questions) {
        if (question.id === questionId) {
          return question;
        }
      }
    }
    throw new Error(`Question with ID ${questionId} not found`);
  }
}
