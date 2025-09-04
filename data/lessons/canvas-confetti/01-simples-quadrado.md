# Canvas Confetti 

Seja bem vindo ao curso de Canvas Confetti! Ao final das etapas, você deve ser capaz de recriar o efeito de canhão de uma versão simples da biblioteca Canvas Confetti:

<img src="/canvas-confetti/square-1.gif" alt="Canvas Confetti" width="500">
<br />

Esse curso possui 5 etapas, cada uma cobrindo um aspecto diferente do efeito de confete. Além disso, tentamos seguir a mesma estrutura da biblioteca original, para que ao final facilite entender até mesmo o código da biblioteca original.

É recomendável que você tenha conhecimento básico de JavaScript, HTML e CSS para seguir o curso. Também é importante que você tenha conhecimento básico de trigonometria, pois na etapa 4 e 5 vamos precisar para criar alguns efeitos mais complexos.

Em cada etapa terá um exemplo prático para você testar e entender o que está acontecendo. Também vamos ter explicações detalhadas sobre o código, para que você possa entender melhor como cada parte funciona. Tente sempre construir os exemplos na área "Seu código", isso vai ajudar bastante para entender como tudo funciona.

Nessa primeira etapa, vamos criar um simples quadrado vermelho para explicar o básico do Canvas.


## Funções do Canvas

Assim como qualquer tag HTML, precisamos usar a função `document.getElementById` para pegar a tag e a função `getContext` para pegar o contexto do Canvas. Além disso, usamos os atributos `width` e `height` para definir o tamanho do Canvas. Mutiplicando esses valores pelo objeto `origin`, podemos posicionar o quadrado no centro do Canvas.

O atributo `fillStyle` define a cor do que será desenhado. Já a função `beginPath` define o início do desenho. A função `moveTo` serve para indicar o ponto de partida do que será desenhado. Já o primeiro `lineTo` usa de ponto inicial o que foi indicado no `moveTo` e seu argumento é o ponto final nos eixos de até onde uma linha deve ser desenhada. A única coisa que muda nos próximos `lineTo` é o ponto inicial que seria o ponto final do `lineTo` anterior.

A função `closePath` serve para fechar o desenho das linhas em um polígono que assume uma cor quando a função `fill` é chamada, sendo essaa cor definida no `fillStyle`.


## Estrutura da biblioteca

No exemplo prático, tudo acontece dentro da função `confetti`, replicando a forma com que a biblioteca original executa suas funcionalidades. O atributo `scalar` é o tamanho do quadrado, algo que será utilizado futuramente para criar efeitos de confete mais complexos.

## Quer entender melhor?

Entenda mais sobre o Canvas no [MDN](https://developer.mozilla.org/pt-BR/docs/Web/API/Canvas_API).
