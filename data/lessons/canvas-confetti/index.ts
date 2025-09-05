import { Lesson } from "../../courses";

export function createCanvasConfettiLessons(): Lesson[] {
  const lessonConfigs = [
    {
      id: "01-simples-quadrado",
      title: "Começando com um quadrado",
      description: "Desenhando um simples quadrado para aprender o básico do Canvas"
    },
    {
      id: "02-cores",
      title: "Adicionando cores e quantidade",
      description: "Agora teremos mais quadrados e variações de cores"
    },
    {
      id: "03-ticks",
      title: "Nem tudo dura para sempre!",
      description: "Como os quadrados se desfazem com o passar do tempo?"
    },
    {
      id: "04-physics",
      title: "Vai um pouco de física?",
      description: "Fazendo os confetes terem efeito de gravidade e velocidade"
    },
    {
      id: "05-wobble",
      title: "Agora sim, confetes!",
      description: "Fazendo cada confete ter um movimento de rotação"
    }
  ];

  return lessonConfigs;
}