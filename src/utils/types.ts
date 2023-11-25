export interface Example {
  id: string;
  example: string;
}

export interface Word {
  id: string;
  word: string;
  date_added: string;
  translation?: string;
  source?: string;
  examples: Example[];
}

export interface AppState {
  words: Word[];
}

export interface WordUpdate {
  id: string;
  word: string;
  translation?: string;
  source?: string;
}

export interface WordCreation {
  word: string;
  translation?: string;
  source?: string;
  examples?: string[];
}
