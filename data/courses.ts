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
    lessons: [
      {
        id: "01-simples-quadrado",
        title: "Começando com um quadrado",
        description: "Desenhando um simples quadrado para aprender o básico do Canvas",
        exampleCode: {
          'index.js': `function confetti({ scalar = 10 } = {}) {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  const origin = {
    x: 0.5,
    y: 0.5,
  }

  const startX = canvas.width * origin.x;
  const startY = canvas.height * origin.y;

  ctx.fillStyle = "#FF0000";

  ctx.beginPath();

  ctx.moveTo(startX, startY);

  ctx.lineTo(startX, startY + scalar);
  ctx.lineTo(startX + scalar, startY + scalar);
  ctx.lineTo(startX + scalar, startY);

  ctx.closePath();
  ctx.fill();
}

confetti();`
        },
        userCodeTemplate: {
          'index.js': `// Seu primeiro desenho no Canvas
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Tente desenhar sua primeira forma aqui...`
        }
      },
      {
        id: "02-formas-geometricas",
        title: "Formas Geométricas",
        description: "Explore diferentes métodos para desenhar formas geométricas",
        exampleCode: {
          'index.js': `const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Triângulo
ctx.fillStyle = "green";
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(100, 50);
ctx.lineTo(75, 100);
ctx.closePath();
ctx.fill();

// Linha com estilo
ctx.strokeStyle = "purple";
ctx.lineWidth = 3;
ctx.beginPath();
ctx.moveTo(150, 50);
ctx.lineTo(250, 100);
ctx.stroke();

// Retângulo com borda
ctx.fillStyle = "orange";
ctx.strokeStyle = "black";
ctx.lineWidth = 2;
ctx.fillRect(300, 50, 80, 60);
ctx.strokeRect(300, 50, 80, 60);`
        },
        userCodeTemplate: {
          'index.js': `// Pratique desenhar diferentes formas
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Crie suas próprias formas geométricas...`
        }
      },
      {
        id: "03-cores-estilos",
        title: "Cores e Estilos",
        description: "Aprenda a usar cores, gradientes e padrões",
        exampleCode: {
          'index.js': `const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Gradiente linear
const gradient = ctx.createLinearGradient(0, 0, 200, 0);
gradient.addColorStop(0, "red");
gradient.addColorStop(0.5, "yellow");
gradient.addColorStop(1, "blue");

ctx.fillStyle = gradient;
ctx.fillRect(20, 20, 200, 100);

// Sombra
ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;
ctx.shadowBlur = 10;

ctx.fillStyle = "lime";
ctx.fillRect(250, 20, 100, 100);

// Resetar sombra
ctx.shadowColor = "transparent";`
        },
        userCodeTemplate: {
          'index.js': `// Experimente com cores e estilos
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Crie seus próprios gradientes e efeitos...`
        }
      }
    ]
  },
]


