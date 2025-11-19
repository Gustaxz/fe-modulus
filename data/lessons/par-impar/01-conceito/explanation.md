# Verificador de Números Pares e Ímpares

Bem-vindo ao curso de verificação de números pares e ímpares! Ao final das etapas, você será capaz de criar uma aplicação completa que verifica se um número é par ou ímpar, com uma interface interativa e melhorias visuais.

<br />

Este curso possui 3 etapas, cada uma cobrindo um aspecto diferente da implementação. Começaremos com os conceitos básicos, depois implementaremos a lógica e finalmente criaremos uma interface mais elaborada.

É recomendável que você tenha conhecimento básico de JavaScript, HTML e CSS para seguir o curso. Também é importante entender operadores matemáticos básicos, especialmente o operador módulo (%).

Em cada etapa terá um exemplo prático para você testar e entender o que está acontecendo. Tente sempre construir os exemplos na área "Seu código", isso vai ajudar bastante para entender como tudo funciona.

Nesta primeira etapa, vamos entender o conceito de números pares e ímpares e como identificá-los programaticamente.

## O que são números pares e ímpares?

**Números pares** são aqueles que podem ser divididos por 2 sem deixar resto. Exemplos: 0, 2, 4, 6, 8, 10...

**Números ímpares** são aqueles que, quando divididos por 2, deixam resto 1. Exemplos: 1, 3, 5, 7, 9, 11...

## O operador módulo (%)

O operador módulo (%) retorna o resto da divisão entre dois números. É a ferramenta perfeita para verificar se um número é par ou ímpar:

- Se `numero % 2 === 0`, o número é **par**
- Se `numero % 2 === 1`, o número é **ímpar**

## Implementação básica

No exemplo prático, você verá uma função simples que recebe um número e retorna se ele é par ou ímpar. A função usa o operador módulo para fazer essa verificação e exibe o resultado no console.

## Testando diferentes números

Experimente modificar o valor da variável `numero` no exemplo para testar diferentes valores e ver como a função se comporta.

## Quer entender melhor?

Saiba mais sobre o operador módulo no [MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Remainder).
