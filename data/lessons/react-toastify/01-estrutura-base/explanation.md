# React Toastify

Neste tutorial, vamos recriar a famosa biblioteca de notificações react-toastify usando apenas HTML, CSS e JavaScript. É um ótimo exercício para treinar os fundamentos!

## Lição 1: A Estrutura Base (O Palco e a Aparência)

Antes de fazer a mágica acontecer com JavaScript, precisamos preparar nosso "palco" (HTML) e definir a "aparência" (CSS) das nossas notificações.

``` html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <title>Recriando Toastify com JS</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Simulador de Notificações</h1>
    
    <div class="buttons">
        <button id="successBtn">Mostrar Sucesso</button>
        <button id="errorBtn">Mostrar Erro</button>
    </div>

    <div id="toast-container"></div>

    <script src="toast.js"></script>
    <script src="app.js"></script>
</body>
</html>
```

O arquivo style.css é como o figurino e o cenário. Ele define as cores, a posição e as animações das nossas notificações para que elas fiquem bonitas.

Crie o arquivo style.css com o código abaixo:
``` CSS
/* Posiciona o container no canto superior direito da tela */
#toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px; /* Espaço entre as notificações */
}

/* Estilo padrão de cada notificação */
.toast {
    padding: 15px 20px;
    border-radius: 5px;
    color: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    /* Animação de entrada e saída */
    transition: all 0.5s;
}

/* Animação para quando a notificação vai desaparecer */
.toast.fade-out {
    opacity: 0;
    transform: translateX(100%);
}

/* Cor para notificação de sucesso */
.toast.success {
    background-color: #28a745;
}

/* Cor para notificação de erro */
.toast.error {
    background-color: #dc3545;
}
```
