// Rode ao lado, e clique nos botões para ver o resultado

const successButton = document.getElementById('successBtn');
const errorButton = document.getElementById('errorBtn');

successButton.addEventListener('click', () => {
    toast.success('Deu tudo certo!');
});

errorButton.addEventListener('click', () => {
    toast.error('Ocorreu uma falha!');
});