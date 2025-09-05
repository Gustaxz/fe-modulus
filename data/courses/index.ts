import { createCanvasConfettiLessons } from "../lessons/canvas-confetti";

export interface Lesson {
  id: string;
  title: string;
  description: string;
  exampleCode?: Record<string, string>;
  userCodeTemplate?: Record<string, string>;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}


export const courses: Course[] = [
  {
    id: "canvas-confetti",
    title: "Recriando a biblioteca Canvas Confetti",
    description: "Aprenda a recriar a biblioteca Canvas Confetti, uma biblioteca de efeitos de confete para o Canvas HTML5",
    lessons: createCanvasConfettiLessons()
  },
]


