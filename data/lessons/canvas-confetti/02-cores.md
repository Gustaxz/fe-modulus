# Cores e Qunatidade!

Agora que você conhece o básico do Canvas,  podemos adicionar mais variações para chegarmos ao confetti.

## Separando as funções

Vamos criar uma nova função ```updateFetti``` que recebe o contexto, a posição x e y, o tamanho e a cor. Dessa forma, podemos reutilizar a função para renderizar mais quadrados.

## Refatorando a função confetti

Primeiramente, vamos adicionar um novo parâmetro `particleCount` que define a quantidade de quadrados que serão renderizados. Ele será utilizado num loop que chamará a função `updateFetti` para renderizar cada quadrado. 

Adicionamos também um array `colors` que define as cores que serão utilizadas para desenhar os quadrados. Quando formos passar a cor para a função `updateFetti`, vamos usar a função `Math.floor(Math.random() * colors.length)` para selecionar uma cor aleatória do array.

Com relação a posição, poderíamos utilizar apenas `startX` e `startY` para definir a posição inicial de todos os quadrados, entretanto, no eixo y, vamos adicionar um offset (`startY - (i * scalar)`) para que os quadrados sejam renderizados um acima do outro e seja possível ver que existem diferentes quadrados. Nas próxima seções, vamos adicionar mais variações para chegarmos ao confetti.

