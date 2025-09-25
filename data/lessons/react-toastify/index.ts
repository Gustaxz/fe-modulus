// data/lessons/meu-curso/index.ts
import { Lesson } from "../../courses";

export function createReactToastifyLessons(): Lesson[] {
  return [
    {
      id: "01-estrutura-base",
      title: "Estrutura Base",
      description: "O que vamos construir e HTML e CSS"
    },
    {
      id: "02-logica-principal",
      title: "Lógica Principal",
      description: "Adicionando a lógica principal com Javascript"
    }
  ];
}