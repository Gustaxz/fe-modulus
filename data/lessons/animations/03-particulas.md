# Sistema de Partículas

Bem-vindo ao mundo dos efeitos visuais espetaculares! Os sistemas de partículas são a base para criar fogo, explosões, neve, confetes e muito mais.

## O que são Sistemas de Partículas?

Um sistema de partículas é uma coleção de **muitos objetos pequenos** (partículas) que, quando animados em conjunto, criam efeitos visuais complexos e orgânicos.

### Características das Partículas:
- 🌟 **Posição** (x, y)
- ⚡ **Velocidade** (vx, vy)
- ⏱️ **Vida útil** (tempo de existência)
- 🎨 **Propriedades visuais** (cor, tamanho, opacidade)
- 🌍 **Física** (gravidade, atrito, colisões)

## Estrutura Básica de uma Partícula

```javascript
class Particle {
    constructor(x, y) {
        // Posição inicial
        this.x = x;
        this.y = y;
        
        // Velocidade aleatória
        this.vx = (Math.random() - 0.5) * 6;
        this.vy = (Math.random() - 0.5) * 6;
        
        // Propriedades visuais
        this.size = Math.random() * 5 + 2;
        this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
        this.alpha = 1;
        
        // Vida útil
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.01;
    }
    
    update() {
        // Atualizar posição
        this.x += this.vx;
        this.y += this.vy;
        
        // Reduzir vida
        this.life -= this.decay;
        this.alpha = this.life;
        
        // Aplicar atrito
        this.vx *= 0.98;
        this.vy *= 0.98;
    }
    
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
    
    isDead() {
        return this.life <= 0;
    }
}
```

## Sistema de Gerenciamento

```javascript
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.maxParticles = 200;
    }
    
    addParticle(x, y) {
        if (this.particles.length < this.maxParticles) {
            this.particles.push(new Particle(x, y));
        }
    }
    
    update() {
        // Atualizar todas as partículas
        this.particles.forEach(particle => particle.update());
        
        // Remover partículas mortas
        this.particles = this.particles.filter(particle => !particle.isDead());
    }
    
    draw(ctx) {
        this.particles.forEach(particle => particle.draw(ctx));
    }
    
    addBurst(x, y, count = 20) {
        for (let i = 0; i < count; i++) {
            this.addParticle(x, y);
        }
    }
    
    getCount() {
        return this.particles.length;
    }
}

// Usar o sistema
const particleSystem = new ParticleSystem();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particleSystem.update();
    particleSystem.draw(ctx);
    
    // Mostrar contador
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText(`Partículas: ${particleSystem.getCount()}`, 10, 25);
    
    requestAnimationFrame(animate);
}

// Adicionar partículas com clique
canvas.addEventListener("click", function(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    particleSystem.addBurst(x, y, 30);
});
```

## Efeitos Específicos

### 🎆 Fogos de Artifício
```javascript
class Firework extends Particle {
    constructor(x, y) {
        super(x, y);
        
        // Velocidade inicial para cima
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = -Math.random() * 15 - 10;
        
        // Propriedades do foguete
        this.gravity = 0.3;
        this.exploded = false;
        this.explosionY = y - Math.random() * 200 - 100;
        
        this.color = "white";
        this.size = 3;
        this.trail = [];
    }
    
    update() {
        if (!this.exploded) {
            // Fase de subida
            this.x += this.vx;
            this.y += this.vy;
            this.vy += this.gravity;
            
            // Rastro
            this.trail.push({ x: this.x, y: this.y });
            if (this.trail.length > 10) {
                this.trail.shift();
            }
            
            // Verificar se deve explodir
            if (this.vy >= 0 || this.y <= this.explosionY) {
                this.explode();
            }
        } else {
            this.life -= 0.02;
            this.alpha = this.life;
        }
    }
    
    explode() {
        this.exploded = true;
        
        // Criar partículas da explosão
        for (let i = 0; i < 50; i++) {
            const angle = (Math.PI * 2 * i) / 50;
            const velocity = Math.random() * 8 + 2;
            
            const spark = new Particle(this.x, this.y);
            spark.vx = Math.cos(angle) * velocity;
            spark.vy = Math.sin(angle) * velocity;
            spark.color = `hsl(${Math.random() * 60 + 15}, 100%, 60%)`; // Cores quentes
            spark.size = Math.random() * 3 + 1;
            spark.gravity = 0.1;
            
            particleSystem.particles.push(spark);
        }
    }
    
    draw(ctx) {
        if (!this.exploded) {
            // Desenhar rastro
            ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
            ctx.lineWidth = 2;
            ctx.beginPath();
            this.trail.forEach((point, i) => {
                if (i === 0) {
                    ctx.moveTo(point.x, point.y);
                } else {
                    ctx.lineTo(point.x, point.y);
                }
            });
            ctx.stroke();
            
            // Desenhar foguete
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}
```

### ❄️ Neve
```javascript
class Snowflake extends Particle {
    constructor() {
        super(Math.random() * canvas.width, -10);
        
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = Math.random() * 2 + 1;
        
        this.size = Math.random() * 4 + 1;
        this.color = "white";
        this.alpha = Math.random() * 0.8 + 0.2;
        
        // Movimento de balanço
        this.swayAmount = Math.random() * 2 + 1;
        this.swaySpeed = Math.random() * 0.02 + 0.01;
        this.angle = 0;
        
        this.life = 1; // Neve não morre, apenas se reposiciona
    }
    
    update() {
        // Movimento para baixo
        this.y += this.vy;
        
        // Balanço lateral
        this.angle += this.swaySpeed;
        this.x += Math.sin(this.angle) * this.swayAmount * 0.1;
        
        // Movimento horizontal suave
        this.x += this.vx;
        
        // Reposicionar quando sair da tela
        if (this.y > canvas.height + 10) {
            this.y = -10;
            this.x = Math.random() * canvas.width;
        }
        
        if (this.x < -10) {
            this.x = canvas.width + 10;
        } else if (this.x > canvas.width + 10) {
            this.x = -10;
        }
    }
    
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        
        // Desenhar floco como estrela simples
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            ctx.rotate(Math.PI / 3);
            ctx.moveTo(0, 0);
            ctx.lineTo(0, this.size);
        }
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;
        ctx.stroke();
        
        ctx.restore();
    }
    
    isDead() {
        return false; // Neve nunca morre
    }
}
```

### 🔥 Fogo
```javascript
class FireParticle extends Particle {
    constructor(x, y) {
        super(x, y);
        
        // Movimento para cima com variação
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = -Math.random() * 8 - 2;
        
        // Propriedades do fogo
        this.size = Math.random() * 8 + 3;
        this.maxSize = this.size;
        this.temperature = Math.random() * 100 + 900; // 900-1000°C
        
        this.life = 1;
        this.decay = Math.random() * 0.03 + 0.02;
        
        // Turbulência
        this.turbulence = Math.random() * 0.1 + 0.05;
    }
    
    update() {
        // Movimento
        this.x += this.vx + (Math.random() - 0.5) * this.turbulence;
        this.y += this.vy;
        
        // Reduzir velocidade vertical (simulando resistência do ar)
        this.vy *= 0.96;
        
        // Reduzir vida e tamanho
        this.life -= this.decay;
        this.size = this.maxSize * this.life;
        this.temperature -= 10;
        
        // Atualizar cor baseada na temperatura
        this.updateColor();
    }
    
    updateColor() {
        if (this.temperature > 950) {
            this.color = `rgb(255, 255, ${Math.floor(this.life * 255)})`;
        } else if (this.temperature > 900) {
            this.color = `rgb(255, ${Math.floor(this.life * 255)}, 0)`;
        } else {
            this.color = `rgb(${Math.floor(this.life * 255)}, 0, 0)`;
        }
    }
    
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.life * 0.8;
        
        // Gradiente radial para efeito de brilho
        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, "transparent");
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}

// Sistema de fogo contínuo
function createFireEffect(x, y) {
    for (let i = 0; i < 3; i++) {
        const fireParticle = new FireParticle(
            x + (Math.random() - 0.5) * 20,
            y
        );
        particleSystem.particles.push(fireParticle);
    }
}

// Adicionar fogo continuamente
setInterval(() => {
    createFireEffect(canvas.width / 2, canvas.height - 50);
}, 50);
```

## Forças Físicas

### Gravidade
```javascript
update() {
    this.x += this.vx;
    this.y += this.vy;
    
    // Aplicar gravidade
    this.vy += 0.1; // Acelera para baixo
}
```

### Vento
```javascript
update() {
    const windStrength = 0.05;
    const windDirection = Math.sin(Date.now() * 0.001) * windStrength;
    
    this.vx += windDirection;
    this.x += this.vx;
    this.y += this.vy;
}
```

### Atração/Repulsão
```javascript
applyForce(targetX, targetY, strength) {
    const dx = targetX - this.x;
    const dy = targetY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 0) {
        const force = strength / (distance * distance);
        this.vx += (dx / distance) * force;
        this.vy += (dy / distance) * force;
    }
}
```

## Otimização de Performance

### Object Pooling
```javascript
class ParticlePool {
    constructor(size) {
        this.pool = [];
        this.active = [];
        
        // Pré-criar partículas
        for (let i = 0; i < size; i++) {
            this.pool.push(new Particle(0, 0));
        }
    }
    
    getParticle() {
        if (this.pool.length > 0) {
            return this.pool.pop();
        }
        return new Particle(0, 0); // Criar nova se pool vazio
    }
    
    releaseParticle(particle) {
        // Resetar propriedades se necessário
        particle.life = 1;
        this.pool.push(particle);
    }
}
```

### Limitação de Área de Desenho
```javascript
draw(ctx) {
    // Só desenhar se estiver na tela
    if (this.x > -50 && this.x < canvas.width + 50 &&
        this.y > -50 && this.y < canvas.height + 50) {
        // ... código de desenho
    }
}
```

## Interatividade Avançada

### Seguir Mouse
```javascript
let mouseX = 0, mouseY = 0;

canvas.addEventListener("mousemove", function(e) {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    
    // Adicionar partículas no rastro do mouse
    if (Math.random() < 0.3) {
        particleSystem.addParticle(mouseX, mouseY);
    }
});
```

### Partículas Responsivas ao Som
```javascript
// Simulação de intensidade de som
let audioIntensity = 0;

function updateAudioIntensity() {
    // Simular variação de volume
    audioIntensity = Math.sin(Date.now() * 0.01) * 0.5 + 0.5;
}

class AudioParticle extends Particle {
    update() {
        super.update();
        
        // Tamanho baseado na intensidade do áudio
        this.size = this.baseSize * (1 + audioIntensity);
        
        // Cor baseada na intensidade
        const intensity = Math.floor(audioIntensity * 255);
        this.color = `rgb(${intensity}, 100, ${255 - intensity})`;
    }
}
```

## Exercícios Criativos

1. **Confetes**: Partículas coloridas caindo com rotação
2. **Explosão Espacial**: Fragmentos com momentum conservado
3. **Chuva**: Gotas com splash ao tocar o chão
4. **Fumaça**: Partículas que sobem e se dissipam
5. **Cosmos**: Estrelas piscando com diferentes intensidades
6. **DNA**: Partículas formando dupla hélice
7. **Magnetismo**: Partículas sendo atraídas/repelidas por campos

## Próximos Passos

Agora você tem o poder de criar efeitos visuais impressionantes! Experimente:

- 🎨 **Combine diferentes tipos** de partículas
- ⚡ **Adicione interatividade** com mouse e teclado  
- 🌟 **Crie seus próprios efeitos** únicos
- 🔧 **Otimize performance** para centenas de partículas

Os sistemas de partículas são limitados apenas pela sua imaginação. Desde simples confetes até simulações complexas de fluidos, as possibilidades são infinitas!

Divirta-se criando seus próprios universos de partículas!
