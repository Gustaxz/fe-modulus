# Nem tudo dura para sempre!

Agora vamos ver a funcionalidade de ticks, que serão responsáveis por atualizar as posições e cores dos confetti com o passar do tempo. Por enquanto, vamos fazer sua funcionalidade base para que os confetti se desfaçam com o passar do tempo.

Os ticks são uma forma de contabilizar o tempo de vida de um confetti, desde sua criação até o momento em que ele se desfaz. É um jeito mais simples de lidar com o tempo do que usar o `setTimeout` ou `setInterval`, porém bem preciso e eficiente.

## Refatoração no código atual

Agora temos uma nova função `update` que será responsável por chamar a função `updateFetti` para cada confetti, ao invés de ser chamada diretamente pela função `confetti`. Antes de discutir seus detalhes, primeiro vamos ver as mudanças que fizemos na função `confetti`.

Foi adicionado um novo parâmetro `ticks` que define a quantidade de ticks que serão utilizados para atualizar os confetti. Além disso, um novo array `fettiArray` que contém os confetti que serão utilizados. Dentro dele são utilizados objetos, então agora a função `updateFetti` recebe um objeto com as propriedades do confetti e não mais os parâmetros individuais. Cada objeto confetti agora recebe também uma propriedade `tick` que define o tick atual do confetti e `totalTicks` que define o total de ticks que o confetti deve ter. Após o loop, a função `update` receberá o array de confetti e uma função dizendo o que acontecerá após os ticks acabarem.

## Função update

### requestAnimationFrame

A função `requestAnimationFrame` é uma função que é chamada a cada frame do navegador. Ela recebe uma função como parâmetro e a executa a cada frame. Ela é muito útil para criar animações, pois é chamada a cada frame do navegador, o que garante que a animação seja executada de forma suave.

### Nossa função update

A função `update` receberá o array de confetti e uma função dizendo o que acontecerá após os ticks acabarem. Usando a função `requestAnimationFrame`, de tempos em tempos vamos verificar quais confetti ainda não esgotaram seus ticks e chamar a função `updateFetti` para cada um deles. Além disso, antes de cada renderização, o canvas é limpo para que os confetti sejam desenhados novamente.

## Como os ticks são atualizados?

Considerando que agora passamos um objeto com as propriedades do confetti, podemos atualizar a referência a um objeto confetti, garantindo que mesmo entre diferentes renderizações, seja possível localizar um confetti específico, já que temos sua referência na memória. 

A cada vez que `updateFetti` é chamada para um confetti em específico, vamos incrementar a propriedade `tick` do confetti em 1 e no final retornar um valor boolean dizendo se o confetti ainda tem ticks para serem executados.

De acordo com a quantidade de ticks restantes, podemos calcular a cor do confetti, atualizando sua opacidade, dando a sensação de que o confetti está se desfazendo.

## Confuso?

A lógica de ticks introduz uma mudança considerável no contexto o que tínhamos até agora. Se não ficou muito claro como funciona, tente entender o código no exemplo prático e depois reler as explicações acima!

