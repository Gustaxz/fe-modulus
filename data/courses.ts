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
      },
      {
        id: "04-physics",
        title: "Vai um pouco de física?",
        description: "Fazendo os confetes terem efeito de gravidade e velocidade",
        exampleCode: {
          'index.js': `function update(ctx, fettis, onDone) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  const remainingFettis = fettis.filter(fetti => updateFetti(ctx, fetti));

  if (remainingFettis.length === 0) {
    onDone();
  } else {
    requestAnimationFrame(() => update(ctx, remainingFettis, onDone));
  }
}

function confetti({ scalar = 10, particleCount = 10, ticks = 200, spread = 70, startVelocity = 10, angle = 90, gravity = 1, drift = 0, decay = 0.9 } = {}) {
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
    const fetti = randomPhysics(
      {
        x: startX,
        y: startY - (i * scalar),
        scalar,
        color: colors[Math.floor(Math.random() * colors.length)],
        tick: 0,
        totalTicks: ticks,
        decay,
        spread,
        startVelocity,
        drift,
        gravity,
        angle
      }
    )

    fettiArray.push(fetti)
  }

  update(ctx, fettiArray, () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  });
}

confetti({ particleCount: 15 });`,
          'physics.js': `
function randomPhysics(fetti) {
  const radAngle = fetti.angle * (Math.PI / 180);
  const radSpread = fetti.spread * (Math.PI / 180);

  return {
    ...fetti,
    velocity: (fetti.startVelocity * 0.5) + (Math.random() * fetti.startVelocity),
    angle2D: -radAngle + ((0.5 * radSpread) - (Math.random() * radSpread)),
    gravity: fetti.gravity * 3,
    drift: fetti.drift,
    decay: fetti.decay,
  }
}


function updateFetti(ctx, fetti) {
  fetti.x += Math.cos(fetti.angle2D) * fetti.velocity + fetti.drift;
  fetti.y += Math.sin(fetti.angle2D) * fetti.velocity + fetti.gravity;
  fetti.velocity *= fetti.decay;

  const { x, y, scalar, color, totalTicks } = fetti

  const progress = fetti.tick / totalTicks;
  const opacity = 1 - progress;
  ctx.fillStyle = \`\${color}\${Math.floor(opacity * 255).toString(16).padStart(2, '0')}\`;

  ctx.beginPath();


  ctx.moveTo(Math.floor(x), Math.floor(y));

  ctx.lineTo(x, y + scalar);
  ctx.lineTo(x + scalar, y + scalar);
  ctx.lineTo(x + scalar, y);

  ctx.closePath();
  ctx.fill();

  fetti.tick++
  return fetti.tick < totalTicks
}


`
        },
        userCodeTemplate: {
          'index.js': `// Experimente com cores e estilos
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Crie seus próprios gradientes e efeitos...`
        }
      },
      {
        id: "05-wobble",
        title: "Agora sim, confetes!",
        description: "Fazendo cada confete ter um movimento de rotação",
        exampleCode: {
          'index.js': `function update(ctx, fettis, onDone) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  const remainingFettis = fettis.filter(fetti => updateFetti(ctx, fetti));

  if (remainingFettis.length === 0) {
    onDone();
  } else {
    requestAnimationFrame(() => update(ctx, remainingFettis, onDone));
  }
}

function confetti({ scalar = 1, particleCount = 10, ticks = 200, spread = 70, startVelocity = 10, angle = 90, gravity = 1, drift = 0, decay = 0.9 } = {}) {
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
    const fetti = randomPhysics(
      {
        x: startX,
        y: startY - (i * scalar),
        scalar,
        color: colors[Math.floor(Math.random() * colors.length)],
        tick: 0,
        totalTicks: ticks,
        decay,
        spread,
        startVelocity,
        drift,
        gravity,
        angle
      }
    )

    fettiArray.push(fetti)
  }

  update(ctx, fettiArray, () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  });
}

confetti({ particleCount: 15, gravity: 0.7, spread: 90 });`,
          'physics.js': `function randomPhysics(fetti) {
  const radAngle = fetti.angle * (Math.PI / 180);
  const radSpread = fetti.spread * (Math.PI / 180);
          
  return {
  ...fetti,
  velocity: (fetti.startVelocity * 0.5) + (Math.random() * fetti.startVelocity),
  angle2D: -radAngle + ((0.5 * radSpread) - (Math.random() * radSpread)),
  gravity: fetti.gravity * 3,
  drift: fetti.drift,
  decay: fetti.decay,
  wobble: Math.random() * 10,
  wobbleSpeed: Math.min(0.11, Math.random() * 0.1 + 0.05),
  wobbleX: 0,
  wobbleY: 0,
  random: Math.random() + 2,
  }
}
          
          
function updateFetti(ctx, fetti) {
  fetti.x += Math.cos(fetti.angle2D) * fetti.velocity + fetti.drift;
  fetti.y += Math.sin(fetti.angle2D) * fetti.velocity + fetti.gravity;
  fetti.velocity *= fetti.decay;

  const { x, y, scalar, color, totalTicks } = fetti

  const progress = fetti.tick / totalTicks;
  const opacity = 1 - progress;
  ctx.fillStyle = \`\${color}\${Math.floor(opacity * 255).toString(16).padStart(2, '0')}\`;


  fetti.wobble += fetti.wobbleSpeed;
  fetti.wobbleX = x + ((10 * scalar) * Math.cos(fetti.wobble));
  fetti.wobbleY = y + ((10 * scalar) * Math.sin(fetti.wobble));

  const x1 = fetti.x + fetti.random;
  const y1 = fetti.y + fetti.random;
  const x2 = fetti.wobbleX + fetti.random;
  const y2 = fetti.wobbleY + fetti.random;


  ctx.beginPath();


  ctx.moveTo(Math.floor(fetti.x), Math.floor(fetti.y));

  ctx.lineTo(Math.floor(fetti.wobbleX), Math.floor(y1));
  ctx.lineTo(Math.floor(x2), Math.floor(y2));
  ctx.lineTo(Math.floor(x1), Math.floor(fetti.wobbleY));

  ctx.closePath();
  ctx.fill();

  fetti.tick++
  return fetti.tick < totalTicks
}          
          
          
          `
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


