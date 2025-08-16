# Animações Canvas

Aprenda a criar animações fluidas e interativas usando Canvas e JavaScript.

## Fundamentos de Animação

Animação é a ilusão de movimento criada através da exibição rápida de quadros sequenciais. No Canvas, criamos animações:

1. **Limpando** a tela
2. **Atualizando** posições/propriedades
3. **Redesenhando** elementos
4. **Repetindo** o processo

## requestAnimationFrame

A função `requestAnimationFrame` é o coração das animações modernas:

```javascript
function animar() {
    // Lógica da animação aqui
    requestAnimationFrame(animar);
}

animar(); // Inicia a animação
```

### Vantagens do requestAnimationFrame
- Sincroniza com a taxa de atualização da tela (60 FPS)
- Pausa automaticamente quando a aba não está ativa
- Otimizada pelo navegador para melhor performance

## Exemplo Básico: Bola Quicando

```javascript
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let x = 50;
let y = 50;
let velocidadeX = 2;
let velocidadeY = 3;
const raio = 20;

function animar() {
    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Atualizar posição
    x += velocidadeX;
    y += velocidadeY;
    
    // Verificar colisões com bordas
    if (x + raio > canvas.width || x - raio < 0) {
        velocidadeX = -velocidadeX;
    }
    if (y + raio > canvas.height || y - raio < 0) {
        velocidadeY = -velocidadeY;
    }
    
    // Desenhar bola
    ctx.beginPath();
    ctx.arc(x, y, raio, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
    
    requestAnimationFrame(animar);
}

animar();
```

## Controlando a Velocidade

### Delta Time
Para animações consistentes independente da taxa de quadros:

```javascript
let ultimoTempo = 0;

function animar(tempoAtual) {
    const deltaTime = tempoAtual - ultimoTempo;
    ultimoTempo = tempoAtual;
    
    // Usar deltaTime para cálculos de movimento
    x += velocidadeX * deltaTime * 0.1;
    
    requestAnimationFrame(animar);
}

requestAnimationFrame(animar);
```

## Easing e Transições

### Linear vs Eased
```javascript
// Linear (velocidade constante)
x += velocidade;

// Easing (suavização)
const alvo = 300;
x += (alvo - x) * 0.1; // Aproxima gradualmente
```

### Funções de Easing Populares
```javascript
// Ease out (desacelera no final)
function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
}

// Ease in out (acelera e desacelera)
function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
```

## Animações Baseadas em Tempo

```javascript
let tempoInicio = Date.now();
const duracao = 2000; // 2 segundos

function animar() {
    const tempoDecorrido = Date.now() - tempoInicio;
    const progresso = Math.min(tempoDecorrido / duracao, 1);
    
    // Interpolar entre valores
    const xInicial = 50;
    const xFinal = 350;
    x = xInicial + (xFinal - xInicial) * easeInOut(progresso);
    
    // Desenhar
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(x, 100, 50, 50);
    
    if (progresso < 1) {
        requestAnimationFrame(animar);
    }
}
```

## Múltiplos Objetos

```javascript
class Particula {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.velocidadeX = (Math.random() - 0.5) * 4;
        this.velocidadeY = (Math.random() - 0.5) * 4;
        this.cor = `hsl(${Math.random() * 360}, 70%, 50%)`;
    }
    
    atualizar() {
        this.x += this.velocidadeX;
        this.y += this.velocidadeY;
        
        // Wrap around screen
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    
    desenhar() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = this.cor;
        ctx.fill();
    }
}

const particulas = [];
for (let i = 0; i < 50; i++) {
    particulas.push(new Particula(
        Math.random() * canvas.width,
        Math.random() * canvas.height
    ));
}

function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particulas.forEach(particula => {
        particula.atualizar();
        particula.desenhar();
    });
    
    requestAnimationFrame(animar);
}
```

## Dicas de Performance

1. **Minimize operações de desenho** - agrupe operações similares
2. **Use transformações** - mais eficiente que calcular posições
3. **Limite a área de redesenho** - use `clearRect` em áreas específicas
4. **Otimize loops** - evite cálculos desnecessários dentro de loops
5. **Use OffscreenCanvas** para cálculos pesados

## Interação com Mouse

```javascript
let mouse = { x: 0, y: 0 };

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

// Na animação, objetos podem seguir o mouse
particula.x += (mouse.x - particula.x) * 0.05;
particula.y += (mouse.y - particula.y) * 0.05;
```

Experimente criar suas próprias animações combinando estes conceitos!
