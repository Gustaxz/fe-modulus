export interface Course {
  id: string;
  title: string;
  description: string;
}

export const courses: Course[] = [
  {
    id: "intro",
    title: "Introdução ao Canvas",
    description: "Aprenda a usar o Canvas HTML5 para criar gráficos e animações"
  },
  {
    id: "dom",
    title: "Manipulação do DOM",
    description: "Crie interações dinâmicas com JavaScript"
  },
  {
    id: "animations",
    title: "Animações Canvas",
    description: "Crie animações fluidas usando requestAnimationFrame"
  }
];
