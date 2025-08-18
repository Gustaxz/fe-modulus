# Formas Geométricas

Agora que você conhece o básico, vamos explorar como criar formas mais complexas e interessantes no Canvas!

## Construindo com Paths

Os **paths** (caminhos) são a base para criar formas personalizadas. Pense neles como desenhar com uma caneta - você pode levantar e baixar a caneta para criar diferentes formas.

### Workflow Básico
```javascript
ctx.beginPath();    // Iniciar novo caminho
ctx.moveTo(x, y);   // Mover para posição inicial
ctx.lineTo(x, y);   // Desenhar linha até novo ponto
ctx.closePath();    // Fechar o caminho (opcional)
ctx.fill();         // Preencher forma
// ou
ctx.stroke();       // Apenas contorno
```

## Triângulos

```javascript
ctx.beginPath();
ctx.moveTo(50, 50);    // Ponto superior
ctx.lineTo(100, 50);   // Canto direito
ctx.lineTo(75, 100);   // Canto inferior
ctx.closePath();       // Volta ao início
ctx.fill();
```

## Linhas Personalizadas

### Estilos de Linha
```javascript
ctx.lineWidth = 5;              // Espessura
ctx.strokeStyle = "purple";     // Cor
ctx.lineCap = "round";          // Terminações: butt, round, square
ctx.lineJoin = "round";         // Junções: miter, round, bevel
```

### Linhas Tracejadas
```javascript
ctx.setLineDash([15, 5]);       // Padrão: 15px linha, 5px espaço
ctx.strokeStyle = "blue";
ctx.stroke();
ctx.setLineDash([]);            // Resetar para linha sólida
```

## Retângulos com Estilo

### Combinando Preenchimento e Borda
```javascript
// Primeiro o preenchimento
ctx.fillStyle = "orange";
ctx.fillRect(100, 100, 80, 60);

// Depois a borda
ctx.strokeStyle = "black";
ctx.lineWidth = 3;
ctx.strokeRect(100, 100, 80, 60);
```

## Formas Complexas

### Estrela de 5 Pontas
```javascript
function drawStar(ctx, x, y, radius) {
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5;
        const px = x + Math.cos(angle) * radius;
        const py = y + Math.sin(angle) * radius;
        
        if (i === 0) {
            ctx.moveTo(px, py);
        } else {
            ctx.lineTo(px, py);
        }
    }
    ctx.closePath();
    ctx.fill();
}
```

### Hexágono
```javascript
function drawHexagon(ctx, x, y, radius) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const px = x + Math.cos(angle) * radius;
        const py = y + Math.sin(angle) * radius;
        
        if (i === 0) {
            ctx.moveTo(px, py);
        } else {
            ctx.lineTo(px, py);
        }
    }
    ctx.closePath();
    ctx.stroke();
}
```

## Curvas

### Curvas Quadráticas
```javascript
ctx.beginPath();
ctx.moveTo(50, 100);
ctx.quadraticCurveTo(100, 50, 150, 100);  // ponto controle, ponto final
ctx.stroke();
```

### Curvas Bézier
```javascript
ctx.beginPath();
ctx.moveTo(50, 100);
ctx.bezierCurveTo(75, 50, 125, 50, 150, 100);  // 2 pontos controle, ponto final
ctx.stroke();
```

## Dicas Avançadas

🎨 **Combine formas** para criar ilustrações complexas

📐 **Use funções** para reutilizar formas (como a estrela acima)

🔄 **Experimente com `globalCompositeOperation`** para efeitos de mistura

⚡ **Performance**: Agrupe operações similares quando possível

## Desafio

Tente recriar estas formas usando os conceitos aprendidos:
- Uma casa simples (retângulo + triângulo)
- Uma face sorridente (círculo + arcos)
- Um padrão geométrico repetitivo
- Sua própria criação artística!

Lembre-se: a prática leva à perfeição. Experimente diferentes combinações e não tenha medo de tentar coisas novas!
