// Rode ao lado, e clique nos botões para ver o resultado

const toast = {};

function showToast(message, type) {
    const container = document.getElementById('toast-container');

    const toastElement = document.createElement('div');

    toastElement.classList.add('toast', type);

    toastElement.textContent = message;

    container.appendChild(toastElement);

    setTimeout(() => {

        toastElement.classList.add('fade-out');
        

        setTimeout(() => {
            toastElement.remove();
        }, 500); 

    }, 3000); 
}

toast.success = (message) => showToast(message, 'success');
toast.error = (message) => showToast(message, 'error');