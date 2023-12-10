export interface Test {
    id: number;
    name: string;
    description: string;
    questions: Question[];
  }
  
  export interface Question {
    id: number;
    text: string;
    type: string;
    suggestions: Suggestion[];
    selectedOptions: string[]; // Ajouté ici pour la gestion des options sélectionnées
  }
  
  export interface Suggestion {
    id: number;
    text: string;
  }
  