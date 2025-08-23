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
        id: "02-cores",
        title: "Adicionando cores e quantidade",
        description: "Agora teremos mais quadrados e variações de cores",
        exampleCode: {
          'index.js': `function updateFetti(ctx, x, y, scalar, color) {
  ctx.fillStyle = color;

  ctx.beginPath();

  ctx.moveTo(x, y);

  ctx.lineTo(x, y + scalar);
  ctx.lineTo(x + scalar, y + scalar);
  ctx.lineTo(x + scalar, y);

  ctx.closePath();
  ctx.fill();
}

function confetti({ scalar = 10, particleCount = 10 } = {}) {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  const origin = {
    x: 0.5,
    y: 0.5,
  }

  const colors = [
      "#26ccff",
      "#a25afd",
      "#ff5e7e",
      "#88ff5a",
      "#fcff42",
      "#ffa62d",
      "#ff36ff",
    ]

  const startX = canvas.width * origin.x;
  const startY = canvas.height * origin.y;


  for (let i = 0; i < particleCount; i++) {
    updateFetti(ctx, startX, startY - (i * scalar), scalar, colors[Math.floor(Math.random() * colors.length)])
  }


}

confetti();`
        },
        userCodeTemplate: {
          'index.js': `// Pratique desenhar diferentes formas
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Crie suas próprias formas geométricas...`
        }
      },
      {
        id: "03-ticks",
        title: "Nem tudo dura para sempre!",
        description: "Como os quadrados se desfazem com o passar do tempo?",
        exampleCode: {
          'index.js': `function updateFetti(ctx, fetti) {
  const { x, y, scalar, color, totalTicks } = fetti

  const progress = fetti.tick / totalTicks;
  const opacity = 1 - progress;
  ctx.fillStyle = \`\${color}\${Math.floor(opacity * 255).toString(16).padStart(2, '0')}\`;

  ctx.beginPath();


  ctx.moveTo(x, y);

  ctx.lineTo(x, y + scalar);
  ctx.lineTo(x + scalar, y + scalar);
  ctx.lineTo(x + scalar, y);

  ctx.closePath();
  ctx.fill();

  fetti.tick++
  return fetti.tick < totalTicks
}

function update(ctx, fettis, onDone) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  const remainingFettis = fettis.filter(fetti => updateFetti(ctx, fetti));


  if (remainingFettis.length === 0) {
    onDone();
  } else {
    requestAnimationFrame(() => update(ctx, remainingFettis, onDone));
  }
}

function confetti({ scalar = 10, particleCount = 10, ticks = 200 } = {}) {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  const origin = {
    x: 0.5,
    y: 0.5,
  }

  const colors = [
    "#26ccff",
    "#a25afd",
    "#ff5e7e",
    "#88ff5a",
    "#fcff42",
    "#ffa62d",
    "#ff36ff",
  ]

  const startX = canvas.width * origin.x;
  const startY = canvas.height * origin.y;

  const fettiArray = []
  for (let i = 0; i < particleCount; i++) {
    fettiArray.push({
      x: startX,
      y: startY - (i * scalar),
      scalar,
      color: colors[Math.floor(Math.random() * colors.length)],
      tick: 0,
      totalTicks: ticks
    })
  }

  update(ctx, fettiArray, () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  });
}

confetti();`
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


