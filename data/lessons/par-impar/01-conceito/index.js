function verificarParImpar(numero) {
    // Usando o operador módulo para verificar se é par ou ímpar
    if (numero % 2 === 0) {
        return `${numero} é PAR`;
    } else {
        return `${numero} é ÍMPAR`;
    }
}

// Testando com diferentes números
const numero = 7;
const resultado = verificarParImpar(numero);

console.log(resultado);

// Testando com mais exemplos
console.log("Testando vários números:");
console.log(verificarParImpar(0));   // 0 é PAR
console.log(verificarParImpar(1));   // 1 é ÍMPAR
console.log(verificarParImpar(2));   // 2 é PAR
console.log(verificarParImpar(15));  // 15 é ÍMPAR
console.log(verificarParImpar(100)); // 100 é PAR
console.log(verificarParImpar(-3));  // -3 é ÍMPAR
console.log(verificarParImpar(-8));  // -8 é PAR
