export type UnitId = "unit1-light" | "unit2-rocks";

export type LessonId =
  | "lesson-1-1-light-dark"
  | "lesson-1-2-sources"
  | "lesson-1-3-reflection"
  | "lesson-1-4-darkness"
  | "lesson-1-5-shadows"
  | "lesson-2-1-rocks-soil"
  | "lesson-2-2-earth-layers"
  | "lesson-2-3-identifying-rocks"
  | "lesson-2-4-rock-cycle"
  | "lesson-2-5-fossils-materials";

export interface VocabWord {
  id: string;
  english: string;
  arabic: string;
  phonetic?: string;
  definitionEn: string;
  definitionAr: string;
  pageRef: string;
  exampleEn?: string;
  exampleAr?: string;
  icon?: string;
}

export interface QuizQuestion {
  id: string;
  questionEn: string;
  questionAr: string;
  options: {
    id: string;
    textEn: string;
    textAr: string;
  }[];
  correctOptionId: string;
  explanationEn: string;
  explanationAr: string;
  pageRef: string;
}

export type ActivityType =
  | "interactive_explorer" // e.g. Light Sources, visual inspection
  | "ai_pointer"          // e.g. Identify Parts, aiming and diagnostics
  | "map_explorer"        // e.g. Environment / Location, fieldwork mapping
  | "voxel_3d"            // e.g. Models / 3D Objects, spatial structural exploration
  | "journey_courseviz"   // e.g. Processes / Sequences, state transition flow
  | "learning_snake"      // e.g. Practice Questions, fast answer challenges
  | "standard_lab";       // Standard experimental lab view

export interface LessonDesignProfile {
  subject: "Science" | "Math";
  lessonType: "concept" | "exploration" | "process" | "identification" | "practice" | "model";
  learningObjective: {
    en: string;
    ar: string;
  };
  interactionNeeded: string;
  visualComplexity: "low" | "medium" | "high" | "3d";
  requiredMedia: string[];
  activityType: ActivityType;
  designRationale: {
    en: string;
    ar: string;
  };
}

export interface StepByStepExperiment {
  id: string;
  titleEn: string;
  titleAr: string;
  pageRef: string;
  question: { en: string; ar: string };
  requirement: { en: string; ar: string };
  operation: { en: string; ar: string };
  steps: {
    stepNumber: number;
    textEn: string;
    textAr: string;
    tipEn?: string;
    tipAr?: string;
    highlightValue?: string;
  }[];
  finalAnswer: { en: string; ar: string };
  verification: { en: string; ar: string };
}

export interface Lesson {
  id: LessonId;
  unitId: UnitId;
  number: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  pageNumbers: string;
  iconName: string;
  summaryEn: string[];
  summaryAr: string[];
  keyWords: VocabWord[];
  experiments?: StepByStepExperiment[];
  quiz: QuizQuestion[];
  designProfile?: LessonDesignProfile;
}

export interface Unit {
  id: UnitId;
  number: number;
  titleEn: string;
  titleAr: string;
  colorTheme: {
    bg: string;
    border: string;
    primary: string;
    accent: string;
    badge: string;
  };
  iconName: string;
  pageRange: string;
  lessons: Lesson[];
}
