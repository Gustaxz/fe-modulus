# Manipulação do DOM

Aprenda como criar interações dinâmicas combinando JavaScript com elementos HTML.

## O que é o DOM?

O Document Object Model (DOM) é uma representação da estrutura HTML da página que permite ao JavaScript:

- Acessar e modificar elementos
- Responder a eventos do usuário
- Criar conteúdo dinâmico
- Alterar estilos em tempo real

## Selecionando Elementos

### Métodos Básicos
```javascript
// Por ID
const elemento = document.getElementById("meuId");

// Por classe
const elementos = document.getElementsByClassName("minhaClasse");

// Por seletor CSS
const elemento = document.querySelector(".classe #id");
const elementos = document.querySelectorAll("div.item");
```

## Modificando Conteúdo

### Alterando Texto e HTML
```javascript
// Alterar texto
elemento.textContent = "Novo texto";

// Alterar HTML
elemento.innerHTML = "<strong>Texto em negrito</strong>";

// Alterar atributos
elemento.setAttribute("class", "novaClasse");
elemento.src = "nova-imagem.jpg";
```

## Eventos Interativos

### Adicionando Event Listeners
```javascript
// Clique
botao.addEventListener("click", function() {
    console.log("Botão clicado!");
});

// Hover
elemento.addEventListener("mouseenter", function() {
    this.style.backgroundColor = "lightblue";
});

// Teclado
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        console.log("Enter pressionado!");
    }
});
```

## Criando Elementos Dinamicamente

```javascript
// Criar novo elemento
const novoDiv = document.createElement("div");
novoDiv.textContent = "Elemento criado dinamicamente";
novoDiv.className = "item-dinamico";

// Adicionar ao DOM
document.body.appendChild(novoDiv);

// Remover elemento
elemento.remove();
```

## Modificando Estilos

```javascript
// Estilo direto
elemento.style.color = "red";
elemento.style.fontSize = "20px";

// Adicionando/removendo classes
elemento.classList.add("ativa");
elemento.classList.remove("inativa");
elemento.classList.toggle("destacada");
```

## Exemplo Prático

Vamos criar uma interação simples onde clicar em um botão muda a cor de um Canvas:

```javascript
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const botao = document.getElementById("mudarCor");

let corAtual = "red";

botao.addEventListener("click", function() {
    // Alterna entre cores
    corAtual = corAtual === "red" ? "blue" : "red";
    
    // Limpa o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Desenha com nova cor
    ctx.fillStyle = corAtual;
    ctx.fillRect(50, 50, 100, 100);
    
    // Atualiza texto do botão
    botao.textContent = `Mudar para ${corAtual === "red" ? "Azul" : "Vermelho"}`;
});
```

## Dicas Importantes

1. **Performance**: Use `document.querySelector` para seleções únicas
2. **Eventos**: Sempre remova event listeners quando não precisar mais
3. **Segurança**: Cuidado com `innerHTML` - prefira `textContent` quando possível
4. **Acessibilidade**: Considere usuários que navegam pelo teclado

Experimente o código de exemplo e crie suas próprias interações!
