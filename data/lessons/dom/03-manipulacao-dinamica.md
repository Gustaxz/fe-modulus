# Manipulação Dinâmica

Agora você dominará a arte de modificar elementos, criar interfaces reativas e construir experiências web verdadeiramente dinâmicas!

## Modificando Propriedades de Elementos

### Conteúdo de Texto
```javascript
const elemento = document.getElementById("meuTexto");

// Texto simples (seguro)
elemento.textContent = "Novo texto";

// HTML (cuidado com XSS!)
elemento.innerHTML = "<strong>Texto em negrito</strong>";

// Valor de inputs
const input = document.getElementById("meuInput");
input.value = "Novo valor";
```

### Atributos
```javascript
const img = document.getElementById("minhaImagem");

// Definir atributos
img.setAttribute("src", "nova-imagem.jpg");
img.setAttribute("alt", "Descrição da imagem");
img.setAttribute("data-id", "123");

// Obter atributos
const src = img.getAttribute("src");
const dataId = img.getAttribute("data-id");

// Remover atributos
img.removeAttribute("data-id");

// Verificar se existe
if (img.hasAttribute("alt")) {
    console.log("Tem alt text");
}
```

### Classes CSS
```javascript
const elemento = document.getElementById("meuElemento");

// Adicionar classe
elemento.classList.add("ativa");
elemento.classList.add("destaque", "animada"); // Múltiplas

// Remover classe
elemento.classList.remove("inativa");

// Alternar classe (toggle)
elemento.classList.toggle("visivel");

// Verificar se tem classe
if (elemento.classList.contains("ativa")) {
    console.log("Elemento está ativo");
}

// Substituir classe
elemento.classList.replace("antiga", "nova");
```

### Estilos Inline
```javascript
const elemento = document.getElementById("meuElemento");

// Propriedades individuais
elemento.style.color = "red";
elemento.style.fontSize = "20px";
elemento.style.backgroundColor = "lightblue";
elemento.style.borderRadius = "10px";

// Múltiplas propriedades
elemento.style.cssText = "color: red; font-size: 20px; background: blue;";

// Obter estilos computados
const estilos = window.getComputedStyle(elemento);
const cor = estilos.color;
const tamanho = estilos.fontSize;
```

## Exemplo Prático: Painel de Controle para Canvas

```javascript
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Estado da aplicação
let state = {
    color: "#ff0000",
    size: 10,
    tool: "brush",
    opacity: 1.0
};

function createControlPanel() {
    const panel = document.createElement("div");
    panel.className = "control-panel";
    panel.style.cssText = `
        margin: 10px 0;
        padding: 15px;
        border: 1px solid #ccc;
        border-radius: 8px;
        background: #f9f9f9;
        display: flex;
        gap: 15px;
        align-items: center;
        flex-wrap: wrap;
    `;
    
    // Seletor de cor
    const colorContainer = createColorControl();
    panel.appendChild(colorContainer);
    
    // Controle de tamanho
    const sizeContainer = createSizeControl();
    panel.appendChild(sizeContainer);
    
    // Seletor de ferramenta
    const toolContainer = createToolControl();
    panel.appendChild(toolContainer);
    
    // Controle de opacidade
    const opacityContainer = createOpacityControl();
    panel.appendChild(opacityContainer);
    
    // Botões de ação
    const actionsContainer = createActionButtons();
    panel.appendChild(actionsContainer);
    
    // Inserir painel
    canvas.insertAdjacentElement("afterend", panel);
}

function createColorControl() {
    const container = document.createElement("div");
    
    const label = document.createElement("label");
    label.textContent = "Cor: ";
    
    const colorInput = document.createElement("input");
    colorInput.type = "color";
    colorInput.value = state.color;
    colorInput.addEventListener("change", function(e) {
        state.color = e.target.value;
        updateDisplay();
    });
    
    container.appendChild(label);
    container.appendChild(colorInput);
    return container;
}

function createSizeControl() {
    const container = document.createElement("div");
    
    const label = document.createElement("label");
    label.textContent = "Tamanho: ";
    
    const sizeSlider = document.createElement("input");
    sizeSlider.type = "range";
    sizeSlider.min = "1";
    sizeSlider.max = "50";
    sizeSlider.value = state.size;
    
    const sizeDisplay = document.createElement("span");
    sizeDisplay.id = "size-display";
    sizeDisplay.textContent = state.size + "px";
    sizeDisplay.style.marginLeft = "5px";
    sizeDisplay.style.minWidth = "40px";
    sizeDisplay.style.display = "inline-block";
    
    sizeSlider.addEventListener("input", function(e) {
        state.size = parseInt(e.target.value);
        sizeDisplay.textContent = state.size + "px";
        updateDisplay();
    });
    
    container.appendChild(label);
    container.appendChild(sizeSlider);
    container.appendChild(sizeDisplay);
    return container;
}

function createToolControl() {
    const container = document.createElement("div");
    
    const label = document.createElement("label");
    label.textContent = "Ferramenta: ";
    
    const toolSelect = document.createElement("select");
    toolSelect.innerHTML = `
        <option value="brush">Pincel</option>
        <option value="eraser">Borracha</option>
        <option value="circle">Círculo</option>
        <option value="rectangle">Retângulo</option>
    `;
    
    toolSelect.addEventListener("change", function(e) {
        state.tool = e.target.value;
        updateDisplay();
    });
    
    container.appendChild(label);
    container.appendChild(toolSelect);
    return container;
}

function createOpacityControl() {
    const container = document.createElement("div");
    
    const label = document.createElement("label");
    label.textContent = "Opacidade: ";
    
    const opacitySlider = document.createElement("input");
    opacitySlider.type = "range";
    opacitySlider.min = "0.1";
    opacitySlider.max = "1";
    opacitySlider.step = "0.1";
    opacitySlider.value = state.opacity;
    
    const opacityDisplay = document.createElement("span");
    opacityDisplay.id = "opacity-display";
    opacityDisplay.textContent = Math.round(state.opacity * 100) + "%";
    opacityDisplay.style.marginLeft = "5px";
    opacityDisplay.style.minWidth = "40px";
    opacityDisplay.style.display = "inline-block";
    
    opacitySlider.addEventListener("input", function(e) {
        state.opacity = parseFloat(e.target.value);
        opacityDisplay.textContent = Math.round(state.opacity * 100) + "%";
        updateDisplay();
    });
    
    container.appendChild(label);
    container.appendChild(opacitySlider);
    container.appendChild(opacityDisplay);
    return container;
}

function createActionButtons() {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.gap = "10px";
    
    // Botão limpar
    const clearBtn = document.createElement("button");
    clearBtn.textContent = "Limpar";
    clearBtn.style.cssText = `
        padding: 8px 15px;
        background: #ff4444;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    `;
    
    clearBtn.addEventListener("click", function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
    
    // Botão salvar
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Salvar";
    saveBtn.style.cssText = `
        padding: 8px 15px;
        background: #44aa44;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    `;
    
    saveBtn.addEventListener("click", function() {
        const link = document.createElement("a");
        link.download = "desenho.png";
        link.href = canvas.toDataURL();
        link.click();
    });
    
    // Botão randomizar cor
    const randomBtn = document.createElement("button");
    randomBtn.textContent = "Cor Aleatória";
    randomBtn.style.cssText = `
        padding: 8px 15px;
        background: #4444ff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    `;
    
    randomBtn.addEventListener("click", function() {
        const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
        state.color = randomColor;
        
        // Atualizar o input de cor também
        const colorInput = document.querySelector('input[type="color"]');
        if (colorInput) colorInput.value = randomColor;
        
        updateDisplay();
    });
    
    container.appendChild(clearBtn);
    container.appendChild(saveBtn);
    container.appendChild(randomBtn);
    return container;
}

function updateDisplay() {
    // Atualizar cursor baseado na ferramenta
    switch(state.tool) {
        case "brush":
            canvas.style.cursor = "crosshair";
            break;
        case "eraser":
            canvas.style.cursor = "grab";
            break;
        default:
            canvas.style.cursor = "pointer";
    }
    
    // Criar preview do pincel
    createBrushPreview();
}

function createBrushPreview() {
    // Remover preview anterior
    const oldPreview = document.getElementById("brush-preview");
    if (oldPreview) oldPreview.remove();
    
    // Criar novo preview
    const preview = document.createElement("div");
    preview.id = "brush-preview";
    preview.style.cssText = `
        position: fixed;
        width: ${state.size}px;
        height: ${state.size}px;
        background: ${state.color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        opacity: ${state.opacity};
        display: none;
    `;
    
    document.body.appendChild(preview);
    
    // Atualizar posição do preview com movimento do mouse
    canvas.addEventListener("mousemove", function(e) {
        preview.style.left = (e.clientX - state.size/2) + "px";
        preview.style.top = (e.clientY - state.size/2) + "px";
        preview.style.display = "block";
    });
    
    canvas.addEventListener("mouseleave", function() {
        preview.style.display = "none";
    });
}

// Inicializar painel
createControlPanel();
updateDisplay();
```

## Modificação em Massa

### Alterando Múltiplos Elementos
```javascript
// Selecionar todos os botões
const botoes = document.querySelectorAll(".btn");

// Aplicar estilo a todos
botoes.forEach(botao => {
    botao.style.borderRadius = "10px";
    botao.addEventListener("click", function() {
        this.classList.toggle("ativo");
    });
});

// Usando for...of
for (const botao of botoes) {
    botao.disabled = false;
}
```

### Criação Dinâmica de Listas
```javascript
function createColorPalette(colors) {
    const palette = document.createElement("div");
    palette.className = "color-palette";
    palette.style.cssText = `
        display: flex;
        gap: 5px;
        margin: 10px 0;
    `;
    
    colors.forEach(color => {
        const colorBtn = document.createElement("div");
        colorBtn.className = "color-btn";
        colorBtn.style.cssText = `
            width: 30px;
            height: 30px;
            background: ${color};
            border: 2px solid #ccc;
            border-radius: 4px;
            cursor: pointer;
        `;
        
        colorBtn.addEventListener("click", function() {
            // Remover seleção anterior
            palette.querySelectorAll(".color-btn").forEach(btn => {
                btn.style.borderColor = "#ccc";
            });
            
            // Marcar como selecionado
            this.style.borderColor = "#000";
            
            // Atualizar cor atual
            state.color = color;
        });
        
        palette.appendChild(colorBtn);
    });
    
    return palette;
}

// Usar
const cores = ["red", "blue", "green", "yellow", "purple", "orange"];
const palette = createColorPalette(cores);
document.body.appendChild(palette);
```

## Animações CSS Dinâmicas

```javascript
function animateElement(elemento, animacao, duracao = 300) {
    // Adicionar classe de animação
    elemento.style.transition = `all ${duracao}ms ease`;
    
    switch(animacao) {
        case "fadeIn":
            elemento.style.opacity = "0";
            setTimeout(() => elemento.style.opacity = "1", 10);
            break;
            
        case "slideIn":
            elemento.style.transform = "translateX(-100%)";
            setTimeout(() => elemento.style.transform = "translateX(0)", 10);
            break;
            
        case "bounce":
            elemento.style.transform = "scale(1.2)";
            setTimeout(() => elemento.style.transform = "scale(1)", duracao/2);
            break;
            
        case "shake":
            elemento.style.transform = "translateX(-10px)";
            setTimeout(() => elemento.style.transform = "translateX(10px)", 100);
            setTimeout(() => elemento.style.transform = "translateX(0)", 200);
            break;
    }
}

// Usar
const botao = document.getElementById("meuBotao");
botao.addEventListener("click", function() {
    animateElement(this, "bounce");
});
```

## Notificações Dinâmicas

```javascript
function showNotification(message, type = "info", duration = 3000) {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Estilos baseados no tipo
    const colors = {
        info: { bg: "#3498db", text: "white" },
        success: { bg: "#27ae60", text: "white" },
        warning: { bg: "#f39c12", text: "white" },
        error: { bg: "#e74c3c", text: "white" }
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${colors[type].bg};
        color: ${colors[type].text};
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = "translateX(0)";
    }, 10);
    
    // Auto remover
    setTimeout(() => {
        notification.style.transform = "translateX(100%)";
        setTimeout(() => notification.remove(), 300);
    }, duration);
    
    return notification;
}

// Usar
showNotification("Desenho salvo com sucesso!", "success");
showNotification("Erro ao carregar arquivo", "error");
```

## Dicas de Performance

⚡ **Batch DOM operations**: Faça múltiplas mudanças de uma vez

```javascript
// ❌ Ineficiente (múltiplos reflows)
elemento.style.width = "100px";
elemento.style.height = "100px";
elemento.style.background = "red";

// ✅ Eficiente (um reflow)
elemento.style.cssText = "width: 100px; height: 100px; background: red;";
```

📦 **Use DocumentFragment** para múltiplas inserções

```javascript
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
    const item = document.createElement("div");
    item.textContent = `Item ${i}`;
    fragment.appendChild(item);
}
container.appendChild(fragment); // Uma única inserção
```

## Projeto Final: Editor Gráfico Completo

Combine tudo para criar:

1. **Painel de ferramentas** com seleção visual
2. **Paleta de cores** dinâmica
3. **Controles deslizantes** para tamanho e opacidade
4. **Sistema de layers** (camadas)
5. **Histórico de ações** (undo/redo)
6. **Exportação** em diferentes formatos
7. **Notificações** para ações do usuário

## Conclusão

Você agora possui as ferramentas para criar interfaces web verdadeiramente dinâmicas e responsivas. A chave é combinar seleção eficiente de elementos, manipulação cuidadosa de propriedades e uma boa arquitetura de eventos.

Continue experimentando e construindo! A web está esperando suas criações interativas incríveis.
