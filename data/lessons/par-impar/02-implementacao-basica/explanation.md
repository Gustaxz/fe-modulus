# Verificação com Operadores Bitwise

Agora vamos aprender uma técnica mais avançada e eficiente para verificar se um número é par ou ímpar usando operadores bitwise!

<br />

Nesta etapa, vamos:
- Entender como os números são representados em binário
- Usar o operador bitwise AND (`&`) para verificar paridade
- Comparar performance entre diferentes métodos
- Implementar uma interface para testar ambas as abordagens

## Representação Binária e o Bit Menos Significativo

Em binário, todos os números pares terminam com `0` e todos os ímpares terminam com `1`:
- `4` = `100` (par - termina em 0)
- `5` = `101` (ímpar - termina em 1)
- `8` = `1000` (par - termina em 0)
- `9` = `1001` (ímpar - termina em 1)

## O Operador Bitwise AND (&)

O operador `&` compara cada bit de dois números. Quando fazemos `numero & 1`:
- Se o último bit for `0`: `0 & 1 = 0` (número par)
- Se o último bit for `1`: `1 & 1 = 1` (número ímpar)

```javascript
// Método tradicional
numero % 2 === 0

// Método bitwise (mais eficiente)
numero & 1 === 0  // par
numero & 1 === 1  // ímpar
```

## Vantagens do Método Bitwise

1. **Performance**: Operações bitwise são mais rápidas que divisão
2. **Elegância**: Trabalha diretamente com a representação binária
3. **Eficiência**: Menos ciclos de CPU necessários

## Comparando os Métodos

No exemplo prático, você verá ambos os métodos em ação e poderá comparar:
- Método tradicional com módulo (%)
- Método bitwise com AND (&)
- Teste de performance com muitos números

## Quando Usar Cada Método

- **Módulo (%)**: Mais legível, melhor para iniciantes
- **Bitwise (&)**: Mais eficiente, ideal para alta performance
