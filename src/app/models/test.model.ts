// test.model.ts

import { Course } from "./course.model";

export interface TestForm {
  testName: string;
  testDescription: string;
  course_id: string;
  questions: QuestionForm[];
  reponseContents?: string[][];
}

export interface Test {
  id?: string;
  course: Course;
  name?: string;
  course_id?: string;
  description?: string;
  questions: Question[];
}




export class Question {
  id?: string;
  text?: string;
  type?: string;
  suggestions: Suggestion[] = [];
  answers: Answer[] = [];
}

export interface QuestionForm {
  questionType?: string;
  questionContent?: string;
  suggestionContents: SuggestionContent[];
}

export interface SuggestionContent {
  suggestionContent: string;
  note: string;
}
export interface Suggestion {
  id: string;
  text: string;
  note: string;
}

export interface Answer {
  id: number; // Supposons que chaque réponse a un identifiant unique
  questionId: string; // L'identifiant de la question liée
  selectedOption: string; // L'option sélectionnée par l'utilisateur
  // Ajoutez d'autres champs si nécessaire
}
