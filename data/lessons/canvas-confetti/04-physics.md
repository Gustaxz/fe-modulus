# Vai um pouco de física?

Nessa etapa, vamos fazer com que os confetti se comportem como se estivessem sob a ação da gravidade e da velocidade. Além disso, eles não vão ficar colados um no outro, mas sim se "espalhando" pelo canvas.

## Mais parâmetros e funções

Antes de explicar os cálculos, iremos para algumas refatorações no código.

Na função `confetti`, adicionamos mais alguns parâmetros:  `decay`, `spread`, `startVelocity`, `drift`, `gravity` e `angle`. A função `updateFetti` foi movida para um novo arquivo `physics.js`, juntamente com uma nova função `randomPhysics` que recebe um objeto com as propriedades do confetti e retorna formatado alguns parâmetros necessários para os cálculos feitos.

## Velocidade, gravidade e ângulo

Ao invés de permancecer com um valor fixo, a cada vez que um confetti é atualizado pela `updateFetti`, um novo valor de `x` e `y` são calculados. 

No eixo `x` temos o cosseno do `angle2d` multiplicado por uma velocidade, somado ao `drift`. Esse `drift` é o valor que "freia" o confetti, para ele ter uma explosão incial, mas não em todo seu período de vida. Já no eixo `y` temos o seno do `angle2d` multiplicado por uma velocidade, somado ao `gravity`, que aqui faz o papel de "freiar" como o `drift`, mas dessa vez no eixo `y`.

A velocidade e o ângulo demandam algumas características especiais calculadas pela função `randomPhysics`, que serão explicadas agora.

## randomPhysics

### Radianos

Logo na primeira linha da função `randomPhysics`, temos a conversão de graus para radianos tanto da propriedade `angle` quanto da propriedade `spread`. Isso facilita os cálculos que precisaremos fazer com eles.	

### Velocidade

Podemos considerar esse cálculo como dividido em duas partes: 

- 1: (fetti.startVelocity * 0.5)
- 2: (Math.random() * fetti.startVelocity)

A segunda parte garante que diferentes confetti tenham velocidades diferentes, garantindo que os confetti estejam mais espalhados durante e depois da explosão inicial.
Já na primeira parte, estamos somando metade da velocidade inicial, garantindo mais velocidade e mais espalhamento. O valor `0.5` é arbitrário, pode ser trocado para aproximar mais de um efeito desejado.

### Angulação

Esse tópico de ângulos é essencial para o confetti, pois ele é o que garante a direção e espalhamento dos confetti. A velocidade também impacta no espalhamento, porém quem mais impacta é o ângulo.

Para entender o cálculo do `angle2d`, vamos considerar os seguintes valores:

- `angle`: 90
- `spread`: 70

Se consideramos que `Math.random()` retorna um valor entre 0 e 1, caso o valor retornado seja `0`, teremos o seguinte cálculo:

`angle2d = -90 + (35 + 70 * 0) = -55`

Num círculo, ficaria como na imagem abaixo:

![Angulo 2D](/physics-1.jpeg)

#### OBS: Deveríamos estar usando radianos, mas para facilitar a visualização, estamos usando graus. Além disso, o grau resultante é negativo, na imagem está sendo representado como positivo para facilitar a visualização. Existe um motivo para o grau ficar negativo, mas vamos ver isso mais tarde.


Agora, se consideramos que `Math.random()` retorna um valor entre 0 e 1, caso o valor retornado seja `1`, teremos o seguinte cálculo:

`angle2d = -90 + (35 + 70 * 1) = 15`

![Angulo 2D](/physics-2.jpeg)

#### OBS: A posição do ângulo na imagem não está exatamente correta, mas é para facilitar a visualização.


Ou seja, esse cálculo garante que o confetti seja espalhado em um ângulo de 70 graus, com o valor de `Math.random()` decidindo em que posição entre esses dois pontos representado o confetti vai estar. Ou seja, na área abaixo:

![Angulo 2D](/physics-3.jpeg)




### Nossa função update

A função `update` receberá o array de confetti e uma função dizendo o que acontecerá após os ticks acabarem. Usando a função `requestAnimationFrame`, de tempos em tempos vamos verificar quais confetti ainda não esgotaram seus ticks e chamar a função `updateFetti` para cada um deles. Além disso, antes de cada renderização, o canvas é limpo para que os confetti sejam desenhados novamente.

## Como os ticks são atualizados?

Considerando que agora passamos um objeto com as propriedades do confetti, podemos atualizar a referência a um objeto confetti, garantindo que mesmo entre diferentes renderizações, seja possível localizar um confetti específico, já que temos sua referência na memória. 

A cada vez que `updateFetti` é chamada para um confetti em específico, vamos incrementar a propriedade `tick` do confetti em 1 e no final retornar um valor boolean dizendo se o confetti ainda tem ticks para serem executados.

De acordo com a quantidade de ticks restantes, podemos calcular a cor do confetti, atualizando sua opacidade, dando a sensação de que o confetti está se desfazendo.

## Confuso?

A lógica de ticks introduz uma mudança considerável no contexto o que tínhamos até agora. Se não ficou muito claro como funciona, tente entender o código no exemplo prático e depois reler as explicações acima!

