## Lição 2: A Lógica (A Mágica do JavaScript)

Agora que temos o palco e a aparência, vamos adicionar o "roteiro" (JavaScript) que fará tudo funcionar. Ele vai ouvir os cliques nos botões, criar as notificações e fazê-las desaparecer.

### A Fábrica de Notificações (toast.js)

Este arquivo é o cérebro do nosso sistema. Ele contém a lógica para criar, mostrar e remover as notificações do DOM.

``` javascript
// Criamos um objeto para organizar nossas funções
const toast = {};

function showToast(message, type) {
    // 1. Acha o container no HTML
    const container = document.getElementById('toast-container');

    // 2. Cria um novo elemento <div>
    const toastElement = document.createElement('div');

    // 3. Adiciona as classes CSS para dar cor e estilo
    toastElement.classList.add('toast', type);

    // 4. Coloca a mensagem dentro do <div>
    toastElement.textContent = message;

    // 5. Adiciona a notificação na tela
    container.appendChild(toastElement);

    // 6. Agenda a remoção da notificação após 3 segundos
    setTimeout(() => {
        // Primeiro, adiciona a classe para a animação de saída
        toastElement.classList.add('fade-out');
        
        // Depois que a animação terminar, remove o elemento
        setTimeout(() => {
            toastElement.remove();
        }, 500); // 0.5 segundos, o mesmo tempo da transição do CSS

    }, 3000); // 3 segundos
}

// Criamos "atalhos" fáceis de usar
toast.success = (message) => showToast(message, 'success');
toast.error = (message) => showToast(message, 'error');
```

### Conectando os Botões (app.js)

Este último arquivo é a "cola". Ele conecta os botões do HTML com a nossa fábrica de notificações do toast.js.

Crie o arquivo app.js com o código abaixo:
``` javascript
// 1. Seleciona os botões que estão no HTML
const successButton = document.getElementById('successBtn');
const errorButton = document.getElementById('errorBtn');

// 2. Diz ao navegador: "Quando o botão de sucesso for clicado..."
successButton.addEventListener('click', () => {
    // "...chame a nossa função de toast de sucesso!"
    toast.success('Deu tudo certo!');
});

// 3. Diz ao navegador: "Quando o botão de erro for clicado..."
errorButton.addEventListener('click', () => {
    // "...chame a nossa função de toast de erro!"
    toast.error('Ocorreu uma falha!');
});
```

### Final

Agora, ao abrir o index.html e clicar nos botões, as notificações aparecerão no canto da tela com as cores certas e desaparecerão sozinhas após 3 segundos. Parabéns, você recriou a lógica do Toastify!