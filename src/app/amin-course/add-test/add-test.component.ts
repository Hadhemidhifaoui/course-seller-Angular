import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { QuestionForm, TestForm } from 'src/app/models/test.model';
import { CourseService } from 'src/app/services/course.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.css']
})
export class AddTestComponent implements OnInit{
  testForm: FormGroup;
  suggestion: FormControl = new FormControl();
  i!: number;
  courses! : Course [];
  get questionControls(): FormArray {
    return this.testForm.get('questions') as FormArray;
  }

  constructor(private fb: FormBuilder, private testService: TestService, private courseService: CourseService, private router: Router) {
    this.testForm = this.fb.group({
      testName: [''],
      testDescription: [''],
      course_id: [''],
      questions: this.fb.array([]),

    });


    // Ajoutez une question initiale au formulaire
    this.addQuestion();
  }
  ngOnInit() {
    this.fetchCourses();

  }
  addQuestion() {
    const newQuestion = this.fb.group({
      questionContent: [''],
      questionType: [''],
      suggestionContents: this.fb.array([])
    });

    // Ajoutez cette question à votre FormArray
    this.questionControls.push(newQuestion);
  }



  removeQuestion(questionIndex: number) {
    this.questionControls.removeAt(questionIndex);
  }

  currentQuestionIndex: number = 0;

  addSuggestion(questionIndex: number): void {
    const question = this.questionControls.at(questionIndex);
    const suggestions = question.get('suggestionContents') as FormArray;
    const newSuggestion = this.fb.group({
      suggestionContent: [''],
      note: new FormControl(0)  
    });
    suggestions.push(newSuggestion);
  }





  removeSuggestion(questionIndex: number, suggestionIndex: number) {
    const question = this.questionControls.at(questionIndex);
    const suggestions = question.get('suggestionContents') as FormArray;
    suggestions.removeAt(suggestionIndex);
  }

  isMultipleChoiceQuestion(questionIndex: number): boolean {
    const questionTypeControl = this.questionControls.at(questionIndex)?.get('questionType');
    const questionTypeValue = questionTypeControl?.value;
    return questionTypeValue === 'Choix Multiple';
  }



  toggleQuestionType(questionIndex: number): void {
    const questionTypeControl = this.questionControls.at(questionIndex)?.get('questionType');

    if (questionTypeControl?.value === 'Choix Multiple') {
      const suggestionsArray = this.suggestionControls(questionIndex);

      if (!suggestionsArray.length) {
  
        suggestionsArray.push(this.fb.group({
          suggestionContent: [''],
          note: [0]
        }));
      }
    } else {
      // Si le choix n'est pas multiple, supprimez le conteneur des suggestions s'il existe
      this.clearSuggestions(questionIndex);
    }
  }

  clearSuggestions(questionIndex: number): void {
    const suggestionsArray = this.suggestionControls(questionIndex);
    while (suggestionsArray.length) {
      suggestionsArray.removeAt(0);
    }
  }


  fetchCourses() {
    this.courseService.getAllCourses().subscribe(
      (courses) => {
        this.courses = courses;
        console.log(courses);
      },
      (error) => {
        console.error('Erreur lors de la récupération des cours', error);
      }
    );
  }


  suggestionControls(questionIndex: number): FormArray {
    return (this.questionControls.at(questionIndex).get('suggestionContents') as FormArray);
  }




  addTest() {
    const testName = this.testForm.get('testName')?.value;
    const testDescription = this.testForm.get('testDescription')?.value;
    const course_id = this.testForm.get('course_id')?.value;
    const questions = this.testForm.get('questions')?.value as QuestionForm[];

    if (testName && course_id && questions) {


      const testRequest: TestForm = {
        testName,
        testDescription,
        course_id,
        questions
      }
      console.log(testRequest);

      this.testService.addTestWithQuestionsAndAnswers(testRequest).subscribe(
        (testResponse) => {
          console.log('Test added successfully', testResponse);
          this.router.navigate(['/admincourse/tests']);
        },
        (error) => {
          console.error('Error adding the test', error);
        });
    } else {
      console.error('Some required form values are missing');
    }
  }










}
