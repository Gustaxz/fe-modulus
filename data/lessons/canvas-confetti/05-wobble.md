# Finalmente, confetes!

Temos as cores, movimentos e os ticks! Agora vamos dar um toque extra para que os confetes se pareçam mais com confetes reais.

## O mecanismo do wobble

Primeiramente, rode o exemplo prático desta etapa para ver o novo efeito para os confetti. Esse efeito de "papel picado" é chamado de "wobble" internamente pela biblioteca, isso é o que vamos explicar agora.

Se reparar o que é exatamente esse efeito, podemos ver que ele é uma espécie de movimento de rotação, alterando constantemente a forma de cada quadrado.

<img src="/wobble-1.gif" alt="Wobble" width="300">
<br />

Para o efeito de rotação, precisamos novamente da nossa velha amiga trigonometria. Temos um `wobble` inicial, que é como se fosse um ângulo, calculado juntamente por um `Math.random()` (dentro da `randomPhysics`) para garantir que cada confetti tenha um `wobble` diferente. O `wobbleSpeed` é um valor que determina a velocidade de rotação do confetti ou o quanto o ângulo `wobble` vai aumentar entre uma atualização e outra.

Dentro de `updateFetti`, tirando o cosseno e o seno do `wobble`, temos onde seria a posição daquele `wobble` em uma espécie de círculo, onde o `wobbleX` seria o eixo `x` e o `wobbleY` seria o eixo `y`. Como seno e cosseno dão um valor entre `-1` e `1`, multiplicamos por `10 * scalar` para garantir que o confetti tenha uma posição condizente com seu tamanho normal. Além disso, criamos `x1` e `y1` para a posição original do confetti e `x2` e `y2` para a posição do `wobble`, sempre somando o `random` para garantir que o confetti tenha uma posição diferente dos outros.

## Parâmetros para a função confetti

A única alteração interna é trocar o valor de `scalar` para `1` ao invés de `10`. Antes o scalar era utilizado apenas para calcular o formato do confetti, agora é utilizado para calcular o novo efeito de rotaçãio, então assume um novo valor mais condizente com o cálculo feito pela `updateFetti` agora.

No momento de chamar a função `confetti`, usamos `particleCount` como `15`, `gravity` como `0.7` e `spread` como `90`, são valores arbitrários para o tamanho de canvas que temos nessa aplicação, mas podem ser ajustados para o seu caso específico.

## Calma, não entendi nada...

Sendo nossa última etapa, não vamos muito profundo no código, justamente para deixar um desafio maior para você! Mas o conselho segue o mesmo: experimente, altere e veja o que acontece! Depois volte para ver as explicações com uma nova visão!

## Próximos passos

Agora você deve ser capaz de recriar uma biblioteca com efeito de canhão de confetes. Além disso, entender melhor o funcionamento interno da biblioteca Canvas-Confetti, então se quiser implementar algo mais completo, pode acessar o [repositório oficial](https://github.com/catdad/canvas-confetti) e ver como ele funciona.

