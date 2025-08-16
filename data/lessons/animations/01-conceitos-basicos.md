# Conceitos Básicos de Animação

Bem-vindo ao mundo fascinante das animações em Canvas! Aqui você aprenderá a dar vida aos seus desenhos criando movimento fluido e envolvente.

## O que é Animação?

Animação é a **ilusão de movimento** criada através da exibição rápida de uma sequência de imagens ligeiramente diferentes. No cinema, isso é feito a 24 quadros por segundo (FPS), mas na web trabalhamos geralmente com 60 FPS.

### Anatomia de uma Animação

```javascript
1. LIMPAR → 2. ATUALIZAR → 3. DESENHAR → 4. REPETIR
```

## O Loop de Animação

### Estrutura Básica
```javascript
function animar() {
    // 1. Limpar o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 2. Atualizar estado (posições, cores, etc.)
    atualizarObjetos();
    
    // 3. Desenhar objetos na nova posição
    desenharObjetos();
    
    // 4. Agendar próximo frame
    requestAnimationFrame(animar);
}

// Iniciar animação
animar();
```

## requestAnimationFrame vs setTimeout

### ❌ Método Antigo (setTimeout)
```javascript
// Problemático - não sincroniza com display
function animarMal() {
    // ... lógica da animação
    setTimeout(animarMal, 16); // ~60 FPS
}
```

### ✅ Método Moderno (requestAnimationFrame)
```javascript
// Otimizado - sincroniza com display
function animarBem() {
    // ... lógica da animação
    requestAnimationFrame(animarBem);
}
```

### Vantagens do requestAnimationFrame:
- 🎯 **Sincronização perfeita** com taxa de atualização da tela
- ⚡ **Pausa automática** quando aba não está visível
- 🔋 **Melhor performance** e economia de bateria
- 🎮 **Controle de FPS** automático pelo navegador

## Exemplo Prático: Quadrado em Movimento

```javascript
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Estado do objeto
let x = 0;
let y = 100;
let velocidadeX = 2;
let velocidadeY = 1;
let tamanho = 50;

function animar() {
    // 1. Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 2. Atualizar posição
    x += velocidadeX;
    y += velocidadeY;
    
    // 3. Verificar bordas e inverter direção
    if (x + tamanho >= canvas.width || x <= 0) {
        velocidadeX = -velocidadeX;
    }
    if (y + tamanho >= canvas.height || y <= 0) {
        velocidadeY = -velocidadeY;
    }
    
    // 4. Desenhar quadrado
    ctx.fillStyle = "red";
    ctx.fillRect(x, y, tamanho, tamanho);
    
    // 5. Continuar animação
    requestAnimationFrame(animar);
}

// Iniciar
animar();
```

## Controlando Velocidade

### Velocidade Baseada em Frames
```javascript
// Simples, mas dependente de FPS
x += 2; // 2 pixels por frame
```

### Velocidade Baseada em Tempo (Recomendado)
```javascript
let ultimoTempo = 0;

function animar(tempoAtual) {
    const deltaTime = tempoAtual - ultimoTempo;
    ultimoTempo = tempoAtual;
    
    // Velocidade em pixels por segundo
    const velocidade = 100; // 100px/s
    x += velocidade * (deltaTime / 1000);
    
    requestAnimationFrame(animar);
}

requestAnimationFrame(animar);
```

## Estados de Animação

### Controlando Play/Pause
```javascript
let animacaoAtiva = true;
let animationId;

function animar() {
    if (!animacaoAtiva) return;
    
    // ... lógica da animação
    
    animationId = requestAnimationFrame(animar);
}

function pausar() {
    animacaoAtiva = false;
    cancelAnimationFrame(animationId);
}

function retomar() {
    animacaoAtiva = true;
    animar();
}

// Controle por teclado
document.addEventListener("keydown", function(e) {
    if (e.code === "Space") {
        if (animacaoAtiva) {
            pausar();
        } else {
            retomar();
        }
    }
});
```

## Múltiplos Objetos

### Estrutura Orientada a Objetos
```javascript
class ObjetoAnimado {
    constructor(x, y, velocidadeX, velocidadeY, cor) {
        this.x = x;
        this.y = y;
        this.velocidadeX = velocidadeX;
        this.velocidadeY = velocidadeY;
        this.cor = cor;
        this.tamanho = 20;
    }
    
    atualizar() {
        this.x += this.velocidadeX;
        this.y += this.velocidadeY;
        
        // Rebater nas bordas
        if (this.x <= 0 || this.x >= canvas.width - this.tamanho) {
            this.velocidadeX = -this.velocidadeX;
        }
        if (this.y <= 0 || this.y >= canvas.height - this.tamanho) {
            this.velocidadeY = -this.velocidadeY;
        }
    }
    
    desenhar() {
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.tamanho, this.tamanho);
    }
}

// Criar array de objetos
const objetos = [];
for (let i = 0; i < 5; i++) {
    const obj = new ObjetoAnimado(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        `hsl(${Math.random() * 360}, 70%, 60%)`
    );
    objetos.push(obj);
}

function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    objetos.forEach(obj => {
        obj.atualizar();
        obj.desenhar();
    });
    
    requestAnimationFrame(animar);
}
```

## Efeitos de Rastro

### Rastro Simples
```javascript
function animar() {
    // Ao invés de limpar completamente, usar transparência
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Desenhar objeto
    ctx.fillStyle = "white";
    ctx.fillRect(x, y, 20, 20);
    
    // Atualizar posição
    x += velocidadeX;
    y += velocidadeY;
    
    requestAnimationFrame(animar);
}
```

## Performance e Otimização

### Dicas Importantes:
1. **Minimize operações de desenho** - agrupe quando possível
2. **Use transformações** ao invés de cálculos manuais
3. **Limite área de limpeza** quando apropriado
4. **Evite criação de objetos** no loop de animação

### Exemplo de Limpeza Seletiva:
```javascript
// Guardar posição anterior
let ultimaX = x, ultimaY = y;

function animar() {
    // Limpar apenas onde estava o objeto
    ctx.clearRect(ultimaX, ultimaY, tamanho, tamanho);
    
    // Atualizar posição
    ultimaX = x;
    ultimaY = y;
    x += velocidadeX;
    y += velocidadeY;
    
    // Desenhar na nova posição
    ctx.fillRect(x, y, tamanho, tamanho);
    
    requestAnimationFrame(animar);
}
```

## Debug e Ferramentas

### Contador de FPS
```javascript
let frames = 0;
let ultimoTempo = performance.now();

function animar(tempoAtual) {
    frames++;
    
    if (tempoAtual - ultimoTempo >= 1000) {
        console.log(`FPS: ${frames}`);
        frames = 0;
        ultimoTempo = tempoAtual;
    }
    
    // ... resto da animação
    
    requestAnimationFrame(animar);
}
```

### Visualizar Informações
```javascript
function desenharInfo() {
    ctx.fillStyle = "black";
    ctx.font = "14px Arial";
    ctx.fillText(`X: ${Math.round(x)}`, 10, 20);
    ctx.fillText(`Y: ${Math.round(y)}`, 10, 40);
    ctx.fillText(`Vel X: ${velocidadeX}`, 10, 60);
    ctx.fillText(`Vel Y: ${velocidadeY}`, 10, 80);
}
```

## Exercícios Práticos

1. **Bola Quicando**: Crie uma bola que quica pelas bordas
2. **Múltiplas Bolas**: Adicione várias bolas com velocidades diferentes
3. **Gravidade**: Implemente gravidade simples
4. **Colisões**: Detecte quando objetos se tocam
5. **Seguir Mouse**: Faça um objeto seguir o cursor

## Próxima Etapa

Na próxima lição, você aprenderá sobre **movimentos circulares** e **trajetórias complexas**, expandindo seu arsenal de técnicas de animação para criar efeitos ainda mais impressionantes!

## Dicas Finais

💡 **Comece simples** - domine movimento linear antes de partir para complexo

🎨 **Experimente valores** - pequenas mudanças podem ter grandes efeitos

🔧 **Use ferramentas de debug** - entenda o que está acontecendo

⚡ **Otimize depois** - faça funcionar primeiro, otimize depois

Divirta-se experimentando com diferentes tipos de movimento!
