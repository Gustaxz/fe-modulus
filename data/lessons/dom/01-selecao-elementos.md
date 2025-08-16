# Seleção de Elementos

Bem-vindo ao mundo da manipulação do DOM! Aqui você aprenderá a "conversar" com os elementos da sua página web usando JavaScript.

## O que é o DOM?

O **Document Object Model (DOM)** é como o JavaScript "vê" sua página HTML. É uma árvore de elementos que você pode navegar, modificar e controlar dinamicamente.

```
document
├── html
    ├── head
    │   ├── title
    │   └── meta
    └── body
        ├── canvas
        ├── div
        └── button
```

## Métodos de Seleção

### 1. Por ID (Mais Comum)
```javascript
const canvas = document.getElementById("myCanvas");
const button = document.getElementById("meuBotao");

// Verificar se elemento existe
if (canvas) {
    console.log("Canvas encontrado!");
} else {
    console.log("Canvas não encontrado!");
}
```

### 2. Por Classe
```javascript
// Retorna uma HTMLCollection (array-like)
const elementos = document.getElementsByClassName("minhaClasse");

// Acessar primeiro elemento
const primeiro = elementos[0];

// Iterar sobre todos
for (let i = 0; i < elementos.length; i++) {
    console.log(elementos[i]);
}
```

### 3. Por Tag
```javascript
const todosOsDivs = document.getElementsByTagName("div");
const todasAsImagens = document.getElementsByTagName("img");
```

### 4. Por Seletor CSS (Mais Flexível)
```javascript
// Primeiro elemento que corresponde
const elemento = document.querySelector(".classe");
const elementoId = document.querySelector("#meuId");
const elementoComplexo = document.querySelector("div.classe > p");

// Todos os elementos que correspondem
const varios = document.querySelectorAll(".classe");
const botoes = document.querySelectorAll("button.ativo");
```

## Seletores CSS Úteis

```javascript
// Por atributo
document.querySelector("[data-id='123']");
document.querySelector("input[type='text']");

// Hierarquia
document.querySelector("div > p");           // Filho direto
document.querySelector("div p");             // Qualquer descendente
document.querySelector("h1 + p");            // Próximo irmão
document.querySelector("h1 ~ p");            // Todos os irmãos seguintes

// Pseudo-seletores
document.querySelector("li:first-child");
document.querySelector("tr:nth-child(2n)");  // Linhas pares
document.querySelector("input:checked");
```

## Navegação entre Elementos

### Relações Familiares
```javascript
const elemento = document.getElementById("meuElemento");

// Pais
const pai = elemento.parentElement;
const ancestral = elemento.closest(".container"); // Subir até encontrar

// Filhos
const filhos = elemento.children;              // HTMLCollection
const primeiroFilho = elemento.firstElementChild;
const ultimoFilho = elemento.lastElementChild;

// Irmãos
const proximo = elemento.nextElementSibling;
const anterior = elemento.previousElementSibling;
```

## Criando Elementos Dinamicamente

### Método Tradicional
```javascript
// Criar elemento
const novoDiv = document.createElement("div");
novoDiv.textContent = "Olá, mundo!";
novoDiv.className = "minha-classe";
novoDiv.id = "novo-elemento";

// Adicionar atributos
novoDiv.setAttribute("data-info", "importante");
novoDiv.style.color = "blue";

// Inserir no DOM
document.body.appendChild(novoDiv);

// Ou inserir em local específico
const container = document.getElementById("container");
container.appendChild(novoDiv);
```

### Posicionamento Preciso
```javascript
const container = document.getElementById("container");
const novoElemento = document.createElement("p");

// Inserir no início
container.insertBefore(novoElemento, container.firstChild);

// Inserir antes de elemento específico
const referencia = document.getElementById("item2");
container.insertBefore(novoElemento, referencia);

// Métodos modernos
container.insertAdjacentElement("beforebegin", novoElemento); // Antes do container
container.insertAdjacentElement("afterbegin", novoElemento);  // Primeiro filho
container.insertAdjacentElement("beforeend", novoElemento);   // Último filho
container.insertAdjacentElement("afterend", novoElemento);    // Depois do container
```

## Exemplo Prático: Canvas Interativo

```javascript
// Selecionar canvas
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Criar painel de controles
function criarControles() {
    const painel = document.createElement("div");
    painel.className = "controles";
    painel.style.margin = "10px 0";
    
    // Botão para desenhar círculo
    const btnCirculo = document.createElement("button");
    btnCirculo.textContent = "Desenhar Círculo";
    btnCirculo.addEventListener("click", function() {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(100, 100, 30, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // Botão para limpar
    const btnLimpar = document.createElement("button");
    btnLimpar.textContent = "Limpar";
    btnLimpar.style.marginLeft = "10px";
    btnLimpar.addEventListener("click", function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
    
    // Adicionar botões ao painel
    painel.appendChild(btnCirculo);
    painel.appendChild(btnLimpar);
    
    // Inserir painel após o canvas
    canvas.insertAdjacentElement("afterend", painel);
}

// Executar
criarControles();
```

## Verificações Importantes

### Elemento Existe?
```javascript
const elemento = document.getElementById("talvez-nao-existe");
if (elemento) {
    // Seguro para usar
    elemento.style.color = "red";
}
```

### Aguardar DOM Carregar
```javascript
// Método 1: DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
    // DOM totalmente carregado
    const canvas = document.getElementById("myCanvas");
    // ... resto do código
});

// Método 2: Verificar readyState
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inicializar);
} else {
    inicializar();
}

function inicializar() {
    // Seu código aqui
}
```

## Dicas de Performance

⚡ **Cache seleções**: Guarde elementos em variáveis se for usá-los várias vezes

```javascript
// ❌ Ineficiente
document.getElementById("canvas").width = 400;
document.getElementById("canvas").height = 300;
document.getElementById("canvas").style.border = "1px solid black";

// ✅ Eficiente
const canvas = document.getElementById("canvas");
canvas.width = 400;
canvas.height = 300;
canvas.style.border = "1px solid black";
```

🎯 **Use querySelector** para seleções únicas, querySelectorAll para múltiplas

📦 **Minimize acessos ao DOM** - faça alterações em batch quando possível

## Desafios Práticos

1. **Contador Dinâmico**: Crie botões que aumentam/diminuem um número na tela
2. **Lista Interativa**: Adicione/remova itens de uma lista
3. **Galeria de Cores**: Crie botões que mudam a cor de fundo do canvas
4. **Construtor de Formas**: Botões que desenham diferentes formas no canvas

## Próxima Etapa

Na próxima lição, você aprenderá a fazer esses elementos responderem a cliques, movimentos do mouse e teclas pressionadas. Prepare-se para tornar sua página verdadeiramente interativa!

Experimente o código de exemplo e tente criar seus próprios elementos dinâmicos. A chave é praticar até se sentir confortável navegando e modificando o DOM.
