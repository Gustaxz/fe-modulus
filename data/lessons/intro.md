# Introdução ao Canvas

O elemento `<canvas>` é uma ferramenta poderosa para criar gráficos, animações e visualizações dinâmicas na web.

## O que é o Canvas?

O Canvas é um elemento HTML5 que fornece uma área de desenho onde você pode criar gráficos 2D usando JavaScript. É como uma tela em branco onde você pode:

- Desenhar formas geométricas
- Criar gradientes e padrões
- Manipular pixels individualmente
- Criar animações fluidas
- Desenvolver jogos simples

## Primeiros Passos

Para usar o Canvas, você precisa:

1. **Criar o elemento HTML**:
```html
<canvas id="myCanvas" width="400" height="300"></canvas>
```

2. **Obter o contexto 2D**:
```javascript
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
```

3. **Começar a desenhar**:
```javascript
ctx.fillStyle = "red";
ctx.fillRect(20, 20, 100, 100);
```

## Conceitos Fundamentais

### Sistema de Coordenadas
- O Canvas usa um sistema de coordenadas onde (0,0) está no canto superior esquerdo
- X aumenta para a direita
- Y aumenta para baixo

### Contexto de Renderização
O contexto (`ctx`) é seu pincel digital. Através dele você:
- Define cores e estilos
- Desenha formas
- Aplica transformações
- Controla transparência

### Estados do Canvas
O Canvas mantém um estado que inclui:
- Cores de preenchimento e contorno
- Espessura de linha
- Transformações aplicadas
- Configurações de texto

## Próximos Passos

Experimente modificar o código de exemplo e observe os resultados. Tente:
- Mudar as cores
- Alterar as posições
- Desenhar múltiplas formas
- Usar diferentes métodos de desenho

Na próxima seção, você aprenderá sobre formas mais complexas e como criar seus próprios desenhos!
