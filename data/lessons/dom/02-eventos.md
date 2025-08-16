# Eventos e Interações

Agora que você sabe selecionar elementos, é hora de fazê-los reagir às ações do usuário! Os eventos são o coração da interatividade web.

## O que são Eventos?

Eventos são ações que acontecem na página web:
- 🖱️ **Mouse**: cliques, movimento, hover
- ⌨️ **Teclado**: teclas pressionadas, liberadas
- 📱 **Touch**: toque, deslizar (dispositivos móveis)
- 🪟 **Janela**: redimensionar, rolar, carregar

## Anatomia de um Event Listener

```javascript
elemento.addEventListener("evento", function(e) {
    // Código que executa quando evento acontece
    console.log("Evento disparado!", e);
});
```

### Parâmetros:
- **"evento"**: Nome do evento ("click", "keydown", etc.)
- **function(e)**: Função que executa (callback)
- **e**: Objeto do evento com informações úteis

## Eventos de Mouse

### Cliques
```javascript
const canvas = document.getElementById("myCanvas");

// Clique simples
canvas.addEventListener("click", function(e) {
    console.log("Canvas clicado!");
    
    // Obter posição do clique
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    console.log(`Posição: (${x}, ${y})`);
});

// Clique duplo
canvas.addEventListener("dblclick", function(e) {
    console.log("Duplo clique!");
});

// Botões específicos
canvas.addEventListener("mousedown", function(e) {
    if (e.button === 0) console.log("Botão esquerdo");
    if (e.button === 1) console.log("Botão meio/scroll");
    if (e.button === 2) console.log("Botão direito");
});
```

### Movimento do Mouse
```javascript
// Mouse entrando na área
canvas.addEventListener("mouseenter", function() {
    canvas.style.cursor = "crosshair";
});

// Mouse saindo da área
canvas.addEventListener("mouseleave", function() {
    canvas.style.cursor = "default";
});

// Mouse movendo
canvas.addEventListener("mousemove", function(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Atualizar display de coordenadas
    document.getElementById("coords").textContent = `(${x}, ${y})`;
});
```

## Eventos de Teclado

```javascript
// Tecla pressionada
document.addEventListener("keydown", function(e) {
    console.log(`Tecla pressionada: ${e.key}`);
    
    // Teclas específicas
    if (e.key === "Enter") console.log("Enter!");
    if (e.key === " ") console.log("Espaço!");
    if (e.key === "Escape") console.log("Escape!");
    
    // Modificadores
    if (e.ctrlKey) console.log("Ctrl está pressionado");
    if (e.shiftKey) console.log("Shift está pressionado");
    if (e.altKey) console.log("Alt está pressionado");
});

// Tecla liberada
document.addEventListener("keyup", function(e) {
    console.log(`Tecla liberada: ${e.key}`);
});

// Input de texto (para campos de texto)
const input = document.getElementById("meuInput");
input.addEventListener("input", function(e) {
    console.log(`Valor atual: ${e.target.value}`);
});
```

## Exemplo Prático: Desenho com Mouse

```javascript
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function startDrawing(e) {
    isDrawing = true;
    
    // Obter posição inicial
    const rect = canvas.getBoundingClientRect();
    lastX = e.clientX - rect.left;
    lastY = e.clientY - rect.top;
    
    // Configurar estilo do desenho
    ctx.lineWidth = 3;
    ctx.strokeStyle = "blue";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    
    // Iniciar novo caminho
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
}

function draw(e) {
    if (!isDrawing) return;
    
    // Obter posição atual
    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    // Desenhar linha
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
    
    // Atualizar posição
    lastX = currentX;
    lastY = currentY;
}

function stopDrawing() {
    isDrawing = false;
}

// Adicionar event listeners
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing); // Parar se sair do canvas
```

## Controles por Teclado

```javascript
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Estado da aplicação
let currentColor = "red";
let brushSize = 5;

document.addEventListener("keydown", function(e) {
    switch(e.key.toLowerCase()) {
        case "c":
        case "C":
            // Limpar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            break;
            
        case "r":
            currentColor = "red";
            break;
            
        case "g":
            currentColor = "green";
            break;
            
        case "b":
            currentColor = "blue";
            break;
            
        case "+":
        case "=":
            // Aumentar pincel
            brushSize = Math.min(brushSize + 2, 50);
            break;
            
        case "-":
            // Diminuir pincel
            brushSize = Math.max(brushSize - 2, 1);
            break;
            
        case "s":
            if (e.ctrlKey) {
                // Ctrl+S para salvar (prevenir comportamento padrão)
                e.preventDefault();
                saveCanvas();
            }
            break;
    }
    
    // Atualizar display
    updateUI();
});

function updateUI() {
    document.getElementById("currentColor").textContent = currentColor;
    document.getElementById("brushSize").textContent = brushSize;
}

function saveCanvas() {
    // Criar link de download
    const link = document.createElement("a");
    link.download = "meu-desenho.png";
    link.href = canvas.toDataURL();
    link.click();
}
```

## Prevenindo Comportamentos Padrão

```javascript
// Prevenir menu de contexto no clique direito
canvas.addEventListener("contextmenu", function(e) {
    e.preventDefault();
});

// Prevenir scroll com teclas de seta
document.addEventListener("keydown", function(e) {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
    }
});

// Prevenir zoom com Ctrl+Scroll
document.addEventListener("wheel", function(e) {
    if (e.ctrlKey) {
        e.preventDefault();
    }
}, { passive: false });
```

## Delegação de Eventos

Útil para elementos criados dinamicamente:

```javascript
// Ao invés de adicionar listener em cada botão
document.addEventListener("click", function(e) {
    // Verificar se o clique foi em um botão de cor
    if (e.target.classList.contains("color-btn")) {
        const color = e.target.dataset.color;
        changeColor(color);
    }
    
    // Verificar se foi no botão de limpar
    if (e.target.id === "clear-btn") {
        clearCanvas();
    }
});
```

## Removendo Event Listeners

```javascript
function minhaFuncao(e) {
    console.log("Evento!");
}

// Adicionar
elemento.addEventListener("click", minhaFuncao);

// Remover (deve ser a mesma função)
elemento.removeEventListener("click", minhaFuncao);

// ❌ Isso NÃO funciona (função anônima diferente)
elemento.removeEventListener("click", function(e) {
    console.log("Evento!");
});
```

## Eventos Personalizados

```javascript
// Criar evento personalizado
const meuEvento = new CustomEvent("desenhoCompleto", {
    detail: {
        timestamp: Date.now(),
        totalStrokes: strokeCount
    }
});

// Escutar evento personalizado
canvas.addEventListener("desenhoCompleto", function(e) {
    console.log("Desenho finalizado!", e.detail);
});

// Disparar evento
canvas.dispatchEvent(meuEvento);
```

## Dicas de Performance

⚡ **Throttling**: Limite eventos que disparam muito frequentemente

```javascript
let lastTime = 0;
canvas.addEventListener("mousemove", function(e) {
    const now = Date.now();
    if (now - lastTime > 16) { // ~60 FPS
        handleMouseMove(e);
        lastTime = now;
    }
});
```

🎯 **Use passive listeners** para scroll e touch quando não precisar prevenir

```javascript
element.addEventListener("scroll", handler, { passive: true });
```

## Projeto Prático: Paint Interativo

Combine tudo que aprendeu para criar:

1. **Desenho com mouse** (arrastar para desenhar)
2. **Troca de cores** (teclas R, G, B)
3. **Controle de tamanho** (+ e - ou scroll)
4. **Limpar tela** (tecla C)
5. **Salvar desenho** (Ctrl+S)
6. **Diferentes ferramentas** (pincel, borracha, formas)

## Próxima Etapa

Na próxima lição, você aprenderá a criar interfaces dinâmicas mais complexas, modificando elementos e estilos em tempo real baseado nas interações do usuário.

Experimente criar diferentes tipos de interação e veja como os eventos podem transformar uma página estática em uma experiência interativa incrível!
