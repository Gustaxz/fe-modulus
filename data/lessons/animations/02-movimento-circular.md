# Movimento Circular

Descubra o poder dos movimentos circulares e orbitais! Esta é uma das técnicas mais elegantes e versáteis em animação Canvas.

## Fundamentos da Matemática Circular

### O Círculo Unitário
Imagine um círculo com raio 1 centrado na origem (0,0). Para qualquer ângulo θ:
- **X = cos(θ)** 
- **Y = sin(θ)**

```
       Y
       ↑
   0.5 |     • (cos(45°), sin(45°))
       |   ╱
       | ╱ θ
   ────┼────────→ X
       |     1
```

### Convertendo para Canvas
```javascript
// Círculo unitário
const x = Math.cos(angle);
const y = Math.sin(angle);

// Círculo com raio e centro personalizados
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 100;

const x = centerX + Math.cos(angle) * radius;
const y = centerY + Math.sin(angle) * radius;
```

## Movimento Circular Básico

### Exemplo Simples
```javascript
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 80;
let angle = 0;

function animar() {
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
    
    // Desenhar linha de conexão
    ctx.strokeStyle = "lightblue";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.stroke();
    
    // Incrementar ângulo
    angle += 0.02;
    
    requestAnimationFrame(animar);
}

animar();
```

## Controle de Velocidade Angular

### Velocidade Constante
```javascript
// Velocidade lenta
angle += 0.01;  // ~0.6 graus por frame

// Velocidade média  
angle += 0.05;  // ~3 graus por frame

// Velocidade rápida
angle += 0.1;   // ~6 graus por frame
```

### Velocidade Baseada em Tempo
```javascript
let ultimoTempo = 0;
const velocidadeAngular = 2; // radianos por segundo

function animar(tempoAtual) {
    const deltaTime = (tempoAtual - ultimoTempo) / 1000;
    ultimoTempo = tempoAtual;
    
    angle += velocidadeAngular * deltaTime;
    
    // ... resto da animação
    
    requestAnimationFrame(animar);
}
```

## Direção do Movimento

### Sentido Horário vs Anti-horário
```javascript
// Anti-horário (padrão matemático)
angle += 0.05;

// Horário (mais intuitivo visualmente)
angle -= 0.05;
```

### Começar de Diferentes Posições
```javascript
// Começar no topo
let angle = -Math.PI / 2;

// Começar na direita
let angle = 0;

// Começar embaixo
let angle = Math.PI / 2;

// Começar na esquerda
let angle = Math.PI;
```

## Órbitas Múltiplas

### Sistema Solar Simples
```javascript
class Planeta {
    constructor(distancia, velocidade, tamanho, cor) {
        this.distancia = distancia;
        this.velocidade = velocidade;
        this.tamanho = tamanho;
        this.cor = cor;
        this.angle = Math.random() * Math.PI * 2; // Posição inicial aleatória
    }
    
    atualizar() {
        this.angle += this.velocidade;
    }
    
    desenhar(centerX, centerY) {
        const x = centerX + Math.cos(this.angle) * this.distancia;
        const y = centerY + Math.sin(this.angle) * this.distancia;
        
        // Desenhar órbita
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, this.distancia, 0, Math.PI * 2);
        ctx.stroke();
        
        // Desenhar planeta
        ctx.fillStyle = this.cor;
        ctx.beginPath();
        ctx.arc(x, y, this.tamanho, 0, Math.PI * 2);
        ctx.fill();
    }
}

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const planetas = [
    new Planeta(60, 0.08, 8, "#FFA500"),   // Mercúrio
    new Planeta(90, 0.06, 10, "#FFC649"),  // Vênus
    new Planeta(120, 0.04, 12, "#6B93D6"), // Terra
    new Planeta(160, 0.03, 9, "#C1440E"),  // Marte
    new Planeta(220, 0.02, 20, "#FAD5A5")  // Júpiter
];

function animar() {
    ctx.fillStyle = "rgba(0, 0, 10, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Sol
    ctx.fillStyle = "#FFD700";
    ctx.beginPath();
    ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
    ctx.fill();
    
    planetas.forEach(planeta => {
        planeta.atualizar();
        planeta.desenhar(centerX, centerY);
    });
    
    requestAnimationFrame(animar);
}
```

## Elipses e Órbitas Excêntricas

### Órbita Elíptica
```javascript
const a = 150; // Semi-eixo maior
const b = 80;  // Semi-eixo menor

function calcularPosicaoEliptica(angle) {
    const x = centerX + Math.cos(angle) * a;
    const y = centerY + Math.sin(angle) * b;
    return { x, y };
}
```

### Órbita com Excentricidade
```javascript
function calcularOrbita(angle, raioBase, excentricidade) {
    const raio = raioBase + Math.sin(angle * 3) * excentricidade;
    const x = centerX + Math.cos(angle) * raio;
    const y = centerY + Math.sin(angle) * raio;
    return { x, y };
}

// Usar
const pos = calcularOrbita(angle, 100, 30);
```

## Movimento Pendular

### Pêndulo Simples
```javascript
const comprimento = 200;
const gravidade = 0.5;
let anguloPendulo = Math.PI / 4; // 45 graus
let velocidadeAngular = 0;

function atualizarPendulo() {
    // Física do pêndulo
    const aceleracao = (-gravidade / comprimento) * Math.sin(anguloPendulo);
    velocidadeAngular += aceleracao;
    anguloPendulo += velocidadeAngular;
    
    // Amortecimento
    velocidadeAngular *= 0.999;
}

function desenharPendulo() {
    const pivotX = canvas.width / 2;
    const pivotY = 50;
    
    const pendX = pivotX + Math.sin(anguloPendulo) * comprimento;
    const pendY = pivotY + Math.cos(anguloPendulo) * comprimento;
    
    // Fio
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(pivotX, pivotY);
    ctx.lineTo(pendX, pendY);
    ctx.stroke();
    
    // Peso
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(pendX, pendY, 20, 0, Math.PI * 2);
    ctx.fill();
    
    // Pivô
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(pivotX, pivotY, 5, 0, Math.PI * 2);
    ctx.fill();
}
```

## Espirais

### Espiral de Arquimedes
```javascript
let angle = 0;
const crescimento = 2;

function desenharEspiral() {
    const raio = angle * crescimento;
    const x = centerX + Math.cos(angle) * raio;
    const y = centerY + Math.sin(angle) * raio;
    
    if (angle === 0) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
    }
    
    angle += 0.1;
    
    if (raio < 200) { // Limite da espiral
        ctx.strokeStyle = `hsl(${angle * 10}, 70%, 60%)`;
        ctx.stroke();
    }
}
```

### Espiral Logarítmica (Concha)
```javascript
const fatorCrescimento = 0.1;

function calcularEspiralLogaritmica(angle) {
    const raio = Math.exp(fatorCrescimento * angle);
    const x = centerX + Math.cos(angle) * raio;
    const y = centerY + Math.sin(angle) * raio;
    return { x, y, raio };
}
```

## Lissajous (Figuras de Lissajous)

### Padrões Complexos
```javascript
let t = 0;
const frequenciaX = 3;
const frequenciaY = 2;
const amplitude = 80;

function desenharLissajous() {
    const x = centerX + Math.sin(frequenciaX * t) * amplitude;
    const y = centerY + Math.sin(frequenciaY * t) * amplitude;
    
    // Desenhar ponto
    ctx.fillStyle = `hsl(${t * 100}, 70%, 60%)`;
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fill();
    
    t += 0.05;
}
```

## Efeitos Avançados

### Rastro Colorido
```javascript
const rastro = [];
const maxRastro = 50;

function adicionarAoRastro(x, y) {
    rastro.push({ x, y });
    if (rastro.length > maxRastro) {
        rastro.shift();
    }
}

function desenharRastro() {
    rastro.forEach((ponto, i) => {
        const alpha = i / rastro.length;
        const tamanho = alpha * 10;
        
        ctx.fillStyle = `rgba(255, 100, 100, ${alpha})`;
        ctx.beginPath();
        ctx.arc(ponto.x, ponto.y, tamanho, 0, Math.PI * 2);
        ctx.fill();
    });
}
```

### Rotação do Próprio Objeto
```javascript
class ObjetoRotativo {
    constructor(x, y, raioOrbita, velocidadeOrbita) {
        this.x = x;
        this.y = y;
        this.raioOrbita = raioOrbita;
        this.velocidadeOrbita = velocidadeOrbita;
        this.angleOrbita = 0;
        this.angleRotacao = 0;
        this.velocidadeRotacao = 0.2;
    }
    
    atualizar() {
        this.angleOrbita += this.velocidadeOrbita;
        this.angleRotacao += this.velocidadeRotacao;
    }
    
    desenhar(centerX, centerY) {
        const x = centerX + Math.cos(this.angleOrbita) * this.raioOrbita;
        const y = centerY + Math.sin(this.angleOrbita) * this.raioOrbita;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(this.angleRotacao);
        
        // Desenhar forma rotativa (retângulo)
        ctx.fillStyle = "orange";
        ctx.fillRect(-15, -5, 30, 10);
        
        ctx.restore();
    }
}
```

## Dicas de Performance

⚡ **Pre-calcule valores constantes** como centro e raio base

🎨 **Use Math.sin/cos tables** para animações muito rápidas

📐 **Normalize ângulos** para evitar overflow: `angle %= Math.PI * 2`

## Exercícios Criativos

1. **Relógio Animado**: Ponteiros movendo em velocidades diferentes
2. **Sistema Solar**: Planetas com luas orbitando
3. **Flor Matemática**: Pétalas usando múltiplas frequências
4. **Hipnótico**: Múltiplos círculos concêntricos
5. **Radar**: Linha varredora com detecção de "objetos"

## Próxima Etapa

Na próxima lição, você dominará **sistemas de partículas**, criando efeitos visuais espetaculares com centenas de elementos animados simultaneamente!

Experimente combinar movimento circular com linear para criar trajetórias únicas e hipnotizantes. A matemática circular é a base de muitos efeitos visuais impressionantes!
