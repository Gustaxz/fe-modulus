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
    id: "intro",
    title: "Introdução ao Canvas",
    description: "Aprenda a usar o Canvas HTML5 para criar gráficos e animações",
    lessons: [
      {
        id: "01-fundamentos",
        title: "Fundamentos do Canvas",
        description: "Aprenda o básico sobre o elemento Canvas e como desenhar formas simples",
        exampleCode: {
          'index.js': `const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Desenhando um retângulo vermelho
ctx.fillStyle = "red";
ctx.fillRect(20, 20, 100, 100);

// Desenhando um círculo azul
ctx.fillStyle = "blue";
ctx.beginPath();
ctx.arc(200, 70, 30, 0, Math.PI * 2);
ctx.fill();`
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
  {
    id: "dom",
    title: "Manipulação do DOM",
    description: "Crie interações dinâmicas com JavaScript",
    lessons: [
      {
        id: "01-selecao-elementos",
        title: "Seleção de Elementos",
        description: "Aprenda diferentes formas de selecionar elementos HTML",
        exampleCode: {
          'index.js': `// Selecionando elementos por ID
const canvas = document.getElementById("myCanvas");
console.log("Canvas encontrado:", canvas);

// Criando botão dinamicamente
const button = document.createElement("button");
button.textContent = "Clique aqui!";
button.style.margin = "10px";

button.addEventListener("click", function() {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "purple";
    ctx.fillRect(Math.random() * 300, Math.random() * 200, 50, 50);
});

document.body.appendChild(button);`
        },
        userCodeTemplate: {
          'index.js': `// Pratique selecionando elementos
const canvas = document.getElementById("myCanvas");

// Crie seus próprios elementos e interações...`
        }
      },
      {
        id: "02-eventos",
        title: "Eventos e Interações",
        description: "Trabalhe com eventos de mouse, teclado e outros",
        exampleCode: {
          'index.js': `const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let isDrawing = false;

// Evento de mouse para desenhar
canvas.addEventListener("mousedown", function(e) {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
});

canvas.addEventListener("mousemove", function(e) {
    if (!isDrawing) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.lineWidth = 3;
    ctx.strokeStyle = "blue";
    ctx.lineTo(x, y);
    ctx.stroke();
});

canvas.addEventListener("mouseup", function() {
    isDrawing = false;
});

// Limpar com tecla C
document.addEventListener("keydown", function(e) {
    if (e.key === "c" || e.key === "C") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});`
        },
        userCodeTemplate: {
          'index.js': `// Crie suas próprias interações com eventos
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Adicione eventos de mouse, teclado, etc...`
        }
      },
      {
        id: "03-manipulacao-dinamica",
        title: "Manipulação Dinâmica",
        description: "Modifique elementos e estilos em tempo real",
        exampleCode: {
          'index.js': `const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Criar controles dinâmicos
const controls = document.createElement("div");
controls.style.margin = "10px";

const colorInput = document.createElement("input");
colorInput.type = "color";
colorInput.value = "#ff0000";

const sizeSlider = document.createElement("input");
sizeSlider.type = "range";
sizeSlider.min = "1";
sizeSlider.max = "50";
sizeSlider.value = "10";

const clearBtn = document.createElement("button");
clearBtn.textContent = "Limpar";

controls.appendChild(document.createTextNode("Cor: "));
controls.appendChild(colorInput);
controls.appendChild(document.createTextNode(" Tamanho: "));
controls.appendChild(sizeSlider);
controls.appendChild(clearBtn);

document.body.appendChild(controls);

// Funcionalidade de desenho
let drawing = false;

canvas.addEventListener("mousedown", () => drawing = true);
canvas.addEventListener("mouseup", () => drawing = false);

canvas.addEventListener("mousemove", function(e) {
    if (!drawing) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.fillStyle = colorInput.value;
    const size = parseInt(sizeSlider.value);
    ctx.fillRect(x - size/2, y - size/2, size, size);
});

clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});`
        },
        userCodeTemplate: {
          'index.js': `// Crie interfaces dinâmicas
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Desenvolva seus próprios controles interativos...`
        }
      }
    ]
  },
  {
    id: "animations",
    title: "Animações Canvas",
    description: "Crie animações fluidas usando requestAnimationFrame",
    lessons: [
      {
        id: "01-conceitos-basicos",
        title: "Conceitos Básicos de Animação",
        description: "Entenda os fundamentos das animações em Canvas",
        exampleCode: {
          'index.js': `const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let x = 0;
let direction = 1;

function animate() {
    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Atualizar posição
    x += direction * 2;
    
    // Inverter direção nas bordas
    if (x >= canvas.width - 50 || x <= 0) {
        direction *= -1;
    }
    
    // Desenhar quadrado
    ctx.fillStyle = "red";
    ctx.fillRect(x, 100, 50, 50);
    
    // Continuar animação
    requestAnimationFrame(animate);
}

animate();`
        },
        userCodeTemplate: {
          'index.js': `// Crie sua primeira animação
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Desenvolva uma animação simples...`
        }
      },
      {
        id: "02-movimento-circular",
        title: "Movimento Circular",
        description: "Aprenda a criar movimentos circulares e orbitais",
        exampleCode: {
          'index.js': `const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let angle = 0;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 80;

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calcular posição circular
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    
    // Desenhar centro
    ctx.fillStyle = "gray";
    ctx.beginPath();
    ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
    ctx.fill();
    
    // Desenhar objeto em órbita
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();
    
    // Desenhar rastro
    ctx.strokeStyle = "lightblue";
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();
    
    angle += 0.05;
    requestAnimationFrame(animate);
}

animate();`
        },
        userCodeTemplate: {
          'index.js': `// Experimente com movimento circular
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Crie seus próprios padrões de movimento...`
        }
      },
      {
        id: "03-particulas",
        title: "Sistema de Partículas",
        description: "Crie efeitos visuais com múltiplos objetos animados",
        exampleCode: {
          'index.js': `const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4;
        this.size = Math.random() * 5 + 2;
        this.color = \`hsl(\${Math.random() * 360}, 70%, 60%)\`;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounce off edges
        if (this.x <= 0 || this.x >= canvas.width) this.vx *= -1;
        if (this.y <= 0 || this.y >= canvas.height) this.vy *= -1;
    }
    
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particles = [];
for (let i = 0; i < 30; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    requestAnimationFrame(animate);
}

animate();`
        },
        userCodeTemplate: {
          'index.js': `// Crie seu próprio sistema de partículas
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Desenvolva efeitos visuais incríveis...`
        }
      }
    ]
  }
];
