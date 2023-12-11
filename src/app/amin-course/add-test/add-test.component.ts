import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  get questionControls() {
    return (this.testForm.get('questions') as FormArray);
  }

  constructor(private fb: FormBuilder, private testService: TestService, private courseService: CourseService, private router: Router) {
    this.testForm = this.fb.group({
      testName: [''],
      testDescription: [''],
      //course_id: 1,
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
    suggestions.push(this.fb.group({
      suggestionContent: ['']  // Définissez une valeur par défaut ici
    }));
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

    // Vérifiez si le choix est multiple
    if (questionTypeControl?.value === 'Choix Multiple') {
      const suggestionsArray = this.suggestionControls(questionIndex);

      // Vérifiez si le conteneur des suggestions est déjà présent
      if (!suggestionsArray.length) {
        // Ajoutez le conteneur des suggestions
        suggestionsArray.push(this.fb.group({
          suggestionContent: ['']
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








  isFormControl(control: any): control is FormControl {
    return control instanceof FormControl;
  }


  suggestionControls(questionIndex: number) {
    return (this.questionControls.at(questionIndex).get('suggestionContents') as FormArray);
  }

  addTest() {
    // Utilize the current form values
    const testName = this.testForm.get('testName')?.value;
    const testDescription = this.testForm.get('testDescription')?.value;
    const course_id = this.testForm.get('course_id')?.value;
    const questions = this.testForm.get('questions')?.value as QuestionForm[];

    // Ensure required values are present before sending the request
    if (testName && course_id && questions) {
      // Create a new TestForm object with form values
      const testRequest: TestForm = {
        testName,
        testDescription,
        course_id,
        questions
      };

      // Send the test request to the service
      console.log(testRequest);
      this.testService.addTestWithQuestionsAndAnswers(testRequest).subscribe(
        (response) => {
          console.log('Test added successfully', response);
          this.router.navigate(['/admincourse/tests']);
        },
        (error) => {
          console.error('Error adding the test', error);
        }
      );
    } else {
      console.error('Some required form values are missing');
    }
  }



}
