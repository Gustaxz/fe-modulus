// Método tradicional usando módulo
function verificarParImparModulo(numero) {
    if (numero % 2 === 0) {
        return `${numero} é PAR (método módulo)`;
    } else {
        return `${numero} é ÍMPAR (método módulo)`;
    }
}

// Método bitwise usando operador AND
function verificarParImparBitwise(numero) {
    if ((numero & 1) === 0) {
        return `${numero} é PAR (método bitwise)`;
    } else {
        return `${numero} é ÍMPAR (método bitwise)`;
    }
}

// Função para mostrar a representação binária
function mostrarBinario(numero) {
    const binario = numero.toString(2);
    const ultimoBit = binario[binario.length - 1];
    return `${numero} = ${binario} (último bit: ${ultimoBit})`;
}

// Testando com diferentes números
console.log("=== COMPARANDO MÉTODOS ===");
const numeros = [0, 1, 2, 3, 4, 5, 15, 16, 100, 101];

numeros.forEach(num => {
    console.log(`\nNúmero: ${num}`);
    console.log(mostrarBinario(num));
    console.log(verificarParImparModulo(num));
    console.log(verificarParImparBitwise(num));
    console.log(`Operação bitwise: ${num} & 1 = ${num & 1}`);
});

// Teste de performance
console.log("\n=== TESTE DE PERFORMANCE ===");

const ITERACOES = 1000000;
const numeroTeste = 12345;

// Teste método módulo
console.time("Método Módulo");
for (let i = 0; i < ITERACOES; i++) {
    numeroTeste % 2 === 0;
}
console.timeEnd("Método Módulo");

// Teste método bitwise
console.time("Método Bitwise");
for (let i = 0; i < ITERACOES; i++) {
    (numeroTeste & 1) === 0;
}
console.timeEnd("Método Bitwise");

console.log("\n=== EXPLICAÇÃO BITWISE ===");
console.log("O operador & compara bit por bit:");
console.log("Qualquer número & 1 verifica apenas o último bit");
console.log("Se último bit = 0 → número par");
console.log("Se último bit = 1 → número ímpar");

// Exemplos visuais
console.log("\nExemplos visuais:");
console.log("4 (100) & 1 (001) = 0 → PAR");
console.log("5 (101) & 1 (001) = 1 → ÍMPAR");
console.log("8 (1000) & 1 (0001) = 0 → PAR");
console.log("9 (1001) & 1 (0001) = 1 → ÍMPAR");
