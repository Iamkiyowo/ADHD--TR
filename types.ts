
export enum UserRole {
  PARENT = 'PARENT',
  PSYCHOLOGIST = 'PSYCHOLOGIST'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
}

export interface ChildBiodata {
  fullName: string;
  nickname: string;
  birthDate: string;
  diagnosis: string;
  allergies: string;
  specialNotes: string;
}

export interface Module {
  id: number;
  title: string;
  description: string;
  content: string;
  category: 'Pondasi' | 'Nutrisi' | 'Perilaku' | 'Spiritual' | 'Keluarga';
  verse?: {
    arabic: string;
    translation: string;
    reference: string;
  };
  keyTakeaway?: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
  category: string;
}

export interface SubstitutionItem {
  category: string;
  avoid: string[];
  replace: string[];
  notes?: string;
}

export interface DailyMenu {
  pagi: string;
  siang: string;
  sore: string;
  malam: string;
}

export interface RotationWeek {
  weekNumber: number;
  days: {
    [key: string]: DailyMenu;
  };
}

export interface JournalEntry {
  id: string;
  date: string;
  mealType: 'Pagi' | 'Snack Pagi' | 'Siang' | 'Snack Sore' | 'Malam';
  food: string;
  behavior: string;
  physical: string;
  nutrition?: {
    protein?: string;
    carbs?: string;
    fats?: string;
  };
  recipeLink?: string;
  sleep?: {
    duration?: string;
    quality?: string;
    notes?: string;
  };
}

export enum ViewState {
  HOME = 'HOME',
  LEARN = 'LEARN',
  TOOLS = 'TOOLS',
  ROTATION = 'ROTATION',
  SPIRITUAL = 'SPIRITUAL',
  LOGIN = 'LOGIN',
  PSYCHOLOGIST_DASHBOARD = 'PSYCHOLOGIST_DASHBOARD',
  BIODATA = 'BIODATA'
}
