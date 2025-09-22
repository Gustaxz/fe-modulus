// Verificador de Par ou Ímpar - Workspace
// Este workspace será usado em todas as lições do curso

// Método 1: Usando operador módulo (%)
function verificarParImparModulo(numero) {
    // Escreva sua lógica aqui...
    // Dica: use o operador módulo (%) para verificar o resto da divisão por 2
    
}

// Método 2: Usando operador bitwise (&)
function verificarParImparBitwise(numero) {
    // Escreva sua lógica aqui...
    // Dica: use o operador & para verificar o bit menos significativo
    // Se numero & 1 === 0, é par; se === 1, é ímpar
    
}

// Teste suas funções aqui
const numeroTeste = 5;
console.log(`Testando com o número ${numeroTeste}:`);
// console.log(verificarParImparModulo(numeroTeste));
// console.log(verificarParImparBitwise(numeroTeste));

// Experimente com outros números:
// console.log("Método módulo:", verificarParImparModulo(10));
// console.log("Método bitwise:", verificarParImparBitwise(10));

// Para ver a representação binária:
// console.log(`${numeroTeste} em binário: ${numeroTeste.toString(2)}`);
// console.log(`${numeroTeste} & 1 = ${numeroTeste & 1}`);
