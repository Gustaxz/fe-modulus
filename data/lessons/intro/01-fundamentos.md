# Fundamentos do Canvas

Bem-vindo ao mundo do Canvas HTML5! Esta é sua primeira etapa na jornada de aprender a criar gráficos e visualizações interativas na web.

## O que é o Canvas?

O elemento `<canvas>` é uma tela digital onde você pode desenhar formas, criar animações e manipular pixels diretamente usando JavaScript. É como ter um quadro em branco que você pode pintar com código!

## Configuração Básica

Para começar a trabalhar com Canvas, você precisa:

### 1. Elemento HTML
```html
<canvas id="myCanvas" width="400" height="300"></canvas>
```

### 2. Contexto JavaScript
```javascript
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
```

O contexto (`ctx`) é sua ferramenta de desenho. Através dele você pode:
- Definir cores e estilos
- Desenhar formas básicas
- Controlar transparência
- Aplicar transformações

## Sistema de Coordenadas

O Canvas usa um sistema de coordenadas cartesiano onde:
- **(0, 0)** está no **canto superior esquerdo**
- **X** aumenta da esquerda para a direita
- **Y** aumenta de cima para baixo

```
(0,0) ────────► X
│
│
│
▼
Y
```

## Suas Primeiras Formas

### Retângulos
```javascript
// Retângulo preenchido
ctx.fillStyle = "red";
ctx.fillRect(x, y, largura, altura);

// Retângulo apenas com borda
ctx.strokeStyle = "blue";
ctx.strokeRect(x, y, largura, altura);
```

### Círculos
```javascript
ctx.fillStyle = "green";
ctx.beginPath();
ctx.arc(x, y, raio, 0, Math.PI * 2);
ctx.fill();
```

## Dicas Importantes

💡 **Sempre use `beginPath()`** antes de desenhar formas com `arc()`, `moveTo()`, etc.

💡 **Cores podem ser**: nomes (`"red"`), hex (`"#ff0000"`), RGB (`"rgb(255,0,0)"`) ou HSL

💡 **Coordenadas podem ser decimais** para posicionamento mais preciso

## Próximos Passos

Agora que você entende o básico, experimente o código de exemplo ao lado e depois pratique criando suas próprias formas na seção "Seu Código"!

Tente:
- Mudar as cores dos elementos
- Alterar posições e tamanhos
- Adicionar mais formas
- Combinar retângulos e círculos
