import { Lesson } from "../../courses";

export function createParImparLessons(): Lesson[] {
  return [
    {
      id: "01-conceito",
      title: "Conceitos Básicos",
      description: "Entenda o que são números pares e ímpares e como identificá-los programaticamente"
    },
    {
      id: "02-implementacao-basica",
      title: "Método Bitwise",
      description: "Aprenda a usar operadores bitwise (&) para verificar paridade de forma mais eficiente"
    },
    {
      id: "03-melhorias-interface",
      title: "Comparação Interativa",
      description: "Interface completa comparando método módulo vs bitwise com análise de performance"
    }
  ];
}
