# Canvas Confetti - Um quadrado vermelho

Bem-vindo a primeira etapa para recriar a biblioteca Canvas Confetti. Nessa etapa, você vai aprender a desenhar um simples quadrado para entender o fundamento do Canvas, além de se familiarizar com a estrutura da biblioteca.

## Funções do Canvas

Assim como qualquer tag HTML, precisamos usar a função `document.getElementById` para pegar a tag e a função `getContext` para pegar o contexto do Canvas. Além disso, usamos os atributos `width` e `height` para definir o tamanho do Canvas. Mutiplicando esses valores pelo objeto `origin`, podemos posicionar o quadrado no centro do Canvas.

O atributo `fillStyle` define a cor do que será desenhado. Já a função `beginPath` define o início do desenho. A função `moveTo` serve para indicar o ponto de partida do que será desenhado. Em conjunto com `lineTo`, como o próprio nome sugere, desenha linhas, sendo o primeiro argumento o ponto final no eixo X e o segundo no eixo Y.

A função `closePath` serve para fechar o desenho das linhas, e a função `fill` preenche o desenho com a cor definida no `fillStyle`.


## Estrutura da biblioteca

No exemplo prático, tudo acontece dentro da função `confetti`, replicando a forma com que a biblioteca original executa suas funcionalidades. O atributo `scalar` é o tamanho do quadrado, algo que será utilizado futuramente para criar efeitos de confete mais complexos.

