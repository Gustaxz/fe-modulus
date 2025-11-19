import { createCanvasConfettiLessons } from "../lessons/canvas-confetti";
import { createParImparLessons } from "../lessons/par-impar";

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
  {
    id: "par-impar",
    title: "Verificador de Números Pares e Ímpares",
    description: "Aprenda a criar uma aplicação completa que verifica se um número é par ou ímpar, com interface interativa e funcionalidades avançadas",
    lessons: createParImparLessons()
  },
]


