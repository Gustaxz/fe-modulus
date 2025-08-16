# Cores e Estilos

Transforme seus desenhos básicos em arte visual impressionante! Nesta etapa, você dominará cores, gradientes, sombras e efeitos especiais.

## Trabalhando com Cores

### Formatos de Cor Suportados

```javascript
// Nomes de cores
ctx.fillStyle = "red";
ctx.fillStyle = "forestgreen";
ctx.fillStyle = "cornflowerblue";

// Hexadecimal
ctx.fillStyle = "#ff0000";    // Vermelho
ctx.fillStyle = "#00ff00";    // Verde
ctx.fillStyle = "#0000ff";    // Azul

// RGB
ctx.fillStyle = "rgb(255, 0, 0)";        // Vermelho
ctx.fillStyle = "rgba(255, 0, 0, 0.5)";  // Vermelho 50% transparente

// HSL (Matiz, Saturação, Luminosidade)
ctx.fillStyle = "hsl(0, 100%, 50%)";     // Vermelho puro
ctx.fillStyle = "hsl(120, 100%, 50%)";   // Verde puro
ctx.fillStyle = "hsl(240, 100%, 50%)";   // Azul puro
```

### Por que HSL é Útil?
- **Matiz (0-360)**: A cor base no círculo cromático
- **Saturação (0-100%)**: Intensidade da cor
- **Luminosidade (0-100%)**: Clareza (0% = preto, 100% = branco)

## Gradientes Lineares

Crie transições suaves entre cores:

```javascript
// Criar gradiente horizontal
const gradient = ctx.createLinearGradient(0, 0, 200, 0);
gradient.addColorStop(0, "red");        // Início
gradient.addColorStop(0.5, "yellow");   // Meio
gradient.addColorStop(1, "blue");       // Fim

ctx.fillStyle = gradient;
ctx.fillRect(20, 20, 200, 100);
```

### Direções de Gradiente
```javascript
// Horizontal: da esquerda para direita
const horizontal = ctx.createLinearGradient(0, 0, width, 0);

// Vertical: de cima para baixo
const vertical = ctx.createLinearGradient(0, 0, 0, height);

// Diagonal
const diagonal = ctx.createLinearGradient(0, 0, width, height);
```

## Gradientes Radiais

Perfeitos para efeitos de luz e profundidade:

```javascript
// Gradiente circular
const radial = ctx.createRadialGradient(
    centerX, centerY, 0,           // Círculo interno (centro, raio)
    centerX, centerY, radius       // Círculo externo (centro, raio)
);

radial.addColorStop(0, "white");    // Centro
radial.addColorStop(0.7, "yellow"); // Meio
radial.addColorStop(1, "red");      // Borda

ctx.fillStyle = radial;
ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
ctx.fill();
```

## Sombras

Adicione profundidade aos seus desenhos:

```javascript
// Configurar sombra
ctx.shadowColor = "rgba(0, 0, 0, 0.5)";  // Cor (transparente)
ctx.shadowOffsetX = 5;                   // Deslocamento horizontal
ctx.shadowOffsetY = 5;                   // Deslocamento vertical
ctx.shadowBlur = 10;                     // Desfoque

// Desenhar forma com sombra
ctx.fillStyle = "lime";
ctx.fillRect(100, 100, 100, 80);

// IMPORTANTE: Resetar sombra após uso
ctx.shadowColor = "transparent";
```

## Transparência Global

Controle a opacidade de tudo que desenhar:

```javascript
ctx.globalAlpha = 0.5;  // 50% transparente
ctx.fillRect(50, 50, 100, 100);

ctx.globalAlpha = 0.3;  // 30% transparente
ctx.fillRect(75, 75, 100, 100);

ctx.globalAlpha = 1.0;  // Restaurar opacidade total
```

## Padrões (Patterns)

Use imagens ou padrões para preenchimento:

```javascript
// Criar canvas pequeno para padrão
const patternCanvas = document.createElement('canvas');
patternCanvas.width = 20;
patternCanvas.height = 20;
const pCtx = patternCanvas.getContext('2d');

// Desenhar padrão
pCtx.fillStyle = 'blue';
pCtx.fillRect(0, 0, 10, 10);
pCtx.fillStyle = 'white';
pCtx.fillRect(10, 10, 10, 10);

// Usar como padrão
const pattern = ctx.createPattern(patternCanvas, 'repeat');
ctx.fillStyle = pattern;
ctx.fillRect(100, 100, 200, 150);
```

## Modos de Composição

Controle como novas formas interagem com as existentes:

```javascript
// Desenhar primeira forma
ctx.fillStyle = "red";
ctx.fillRect(50, 50, 100, 100);

// Alterar modo de composição
ctx.globalCompositeOperation = "multiply";

// Desenhar segunda forma
ctx.fillStyle = "blue";
ctx.fillRect(100, 100, 100, 100);

// Resetar para normal
ctx.globalCompositeOperation = "source-over";
```

### Modos Úteis:
- `"source-over"` - Normal (padrão)
- `"multiply"` - Multiplicação (escurece)
- `"screen"` - Clareia
- `"overlay"` - Sobreposição
- `"difference"` - Diferença
- `"xor"` - OU exclusivo

## Exemplo Prático: Botão com Gradiente

```javascript
function drawGradientButton(x, y, width, height, text) {
    // Gradiente de fundo
    const bg = ctx.createLinearGradient(x, y, x, y + height);
    bg.addColorStop(0, "#4CAF50");
    bg.addColorStop(1, "#45a049");
    
    // Sombra
    ctx.shadowColor = "rgba(0,0,0,0.3)";
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 4;
    
    // Desenhar botão
    ctx.fillStyle = bg;
    ctx.fillRect(x, y, width, height);
    
    // Resetar sombra
    ctx.shadowColor = "transparent";
    
    // Texto
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.fillText(text, x + width/2, y + height/2 + 6);
}
```

## Dicas Criativas

🌈 **Paletas harmoniosas**: Use ferramentas como Adobe Color para escolher cores

🎨 **Gradientes sutis**: Menos é mais - gradientes suaves são mais elegantes

💡 **Sombras realistas**: Sombras devem ser mais escuras e desfocadas quanto mais distantes

⚡ **Performance**: Crie gradientes e padrões uma vez, reutilize várias vezes

## Experimente Agora!

Crie algo único combinando:
- Um fundo com gradiente radial (simulando luz)
- Formas com sombras em diferentes alturas
- Transparência para criar camadas
- Sua própria paleta de cores
- Efeitos de luz e reflexo

Lembre-se: a arte digital é sobre experimentação. Não tenha medo de testar combinações malucas - algumas das melhores descobertas acontecem por acidente!
