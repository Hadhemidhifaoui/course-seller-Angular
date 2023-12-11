// test.model.ts

import { Course } from "./course.model";

export interface TestForm {
  testName: string;
  testDescription: string;
  course_id: string; // Alignez le type ici avec la classe Test
  questions: QuestionForm[];
}

export interface Test<T = Course | null> {
  id?: string;
  course: T;
  name?: string;
  course_id?: string;
  description?: string;
  questions?: Question[];
}




export class Question {
  id?: string;
  text?: string;
  suggestions?: Suggestion[];
}

export interface QuestionForm {
  questionType?: string;
  questionContent?: string;
  suggestionContents: SuggestionContent[];
}

export interface SuggestionContent {
  suggestionContent: string;
}
export interface Suggestion {
  id: string;
  text: string;
}
