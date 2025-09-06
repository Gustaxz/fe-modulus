## Modulus

Bem vindo ao Modulus! A ideia desse projeto é ser um espaço para aprendizagem de como bibliotecas de front-end javascript funcionam por baixo dos panos, com um espaço com códigos de exemplo e uma área para você treinar.

Você pode acessar o projeto [aqui](https://modulus-pi.vercel.app/).


## Quero criar um curso

O Modulus é um projeto open source, então você pode criar seus cursos do jeito que você quiser. Se deseja que ele apareça no site, basta criar um pull request com o seu curso que vamos analisar e aprovar.

### Como criar um novo curso (passo a passo)

Abaixo está um guia prático e detalhado para você criar e registrar um novo curso no Modulus.

#### 1) Entenda a estrutura do projeto

Os cursos e lições vivem dentro de `data/`:

```
data/
  courses/
    index.ts                # Catálogo de cursos visíveis no site
  lessons/
    <course-id>/            # Pasta do seu curso (ex.: "canvas-confetti")
      index.html            # (Opcional) Template HTML para renderizar o código
      index.template.js     # (Opcional) Template JS inicial para o editor do usuário
      01-introducao/        # Pasta de uma lição (id da lição = nome da pasta)
        explanation.md      # Texto/markdown que aparece na página da lição
        index.js            # Arquivo(s) .js de exemplo exibidos no "Exemplo Prático"
      02-segunda-licao/
        explanation.md
        index.js
```

Arquivos estáticos (imagens) que você referenciar no `explanation.md` podem ser colocados em `public/<course-id>/` e referenciados como `/ <course-id> /minha-imagem.png`.

#### 2) Crie a pasta do curso e as lições

1. Defina um `course-id` em kebab-case, por exemplo `meu-curso`.
2. Crie `data/lessons/meu-curso/`.
3. Para cada lição, crie uma pasta numerada e com slug, por exemplo:
   - `data/lessons/meu-curso/01-introducao/`
   - `data/lessons/meu-curso/02-avancado/`
4. Dentro de cada pasta de lição, crie ao menos:
   - `explanation.md`: conteúdo em Markdown (aceita HTML simples). É o que aparece no topo da página da lição.
   - Um ou mais arquivos `.js` (por exemplo `index.js`), que aparecerão na seção "Exemplo Prático" do editor.

Observações importantes:
- O id da lição deve ser exatamente o nome da pasta (ex.: `01-introducao`).
- O sistema carrega automaticamente todos os arquivos `.js` da pasta da lição como exemplos (apenas `.js`).
- O texto do `explanation.md` é carregado em `src/app/curso/[id]/page.tsx` via caminho `data/lessons/<course-id>/<lesson-id>/explanation.md`.

#### 3) (Opcional, mas recomendado) Adicione templates do curso

- `data/lessons/<course-id>/index.template.js`: define o código inicial que o usuário verá no editor (é entregue como `index.js`).
- `data/lessons/<course-id>/index.html`: template HTML utilizado para renderizar a saída do código. Inclua, se necessário, um `<canvas id="myCanvas">` ou elementos que seu exemplo usar. O que está no `index.html` da pasta `canvas-confetti` é um bom exemplo, pois inclui funcionalidades de como mostrar as saídas do `console.log`, por exemplo.

Se você não fornecer esses arquivos, o sistema usa templates padrão amigáveis (com um `<canvas>` básico).

#### 4) Liste as lições do curso em um arquivo de índice do curso

Crie um arquivo `data/lessons/<course-id>/index.ts` exportando uma função que retorna o array de lições com `id`, `title` e `description`:

```ts
// data/lessons/meu-curso/index.ts
import { Lesson } from "../../courses";

export function createMeuCursoLessons(): Lesson[] {
  return [
    {
      id: "01-introducao",
      title: "Introdução",
      description: "O que vamos construir e como o editor funciona"
    },
    {
      id: "02-avancado",
      title: "Avançando",
      description: "Aprimorando a solução com novas ideias"
    }
  ];
}
```

O `id` de cada lição deve corresponder exatamente ao nome da pasta da lição.

#### 5) Registre o curso no catálogo

Edite `data/courses/index.ts` para importar sua função de lições e adicionar um objeto do curso ao array `courses`:

```ts
// data/courses/index.ts
import { createMeuCursoLessons } from "../lessons/meu-curso";

export const courses: Course[] = [
  // ... cursos existentes
  {
    id: "meu-curso",
    title: "Título do Meu Curso",
    description: "Breve descrição do objetivo do curso",
    lessons: createMeuCursoLessons()
  }
];
```

Assim o curso passa a ser considerado na geração de rotas estáticas em `src/app/curso/[id]/page.tsx` e ficará acessível em `/curso/meu-curso`.

#### 6) Referencie assets (imagens) no markdown

Coloque imagens em `public/<course-id>/` e use no `explanation.md` links como `/meu-curso/minha-imagem.png`.

#### 7) Teste localmente

- Rode o projeto: `npm install && npm run dev`.
- Acesse `http://localhost:3000/curso/<course-id>`.
- Navegue entre as lições com o seletor ou por `?lesson=<lesson-id>`. Se nenhum `lesson` for informado, a primeira lição listada será aberta.

#### 8) Checklist de validação

- Curso registrado em `data/courses/index.ts` com `id`, `title`, `description` e `lessons`.
- Pasta `data/lessons/<course-id>/` criada.
- Cada lição tem pasta própria com `explanation.md` e pelo menos um `.js` (ex.: `index.js`).
- (Opcional)  `index.html` presente para uma melhor experiência.
- Assets referenciados no markdown estão em `public/<course-id>/`.

#### 9) Dicas e armadilhas comuns

- Os nomes das pastas de lição devem bater 1:1 com o `id` usado no índice do curso.
- Apenas arquivos `.js` da pasta da lição aparecem como "Exemplo Prático".
- Se você atualizar `index.template.js`, usuários podem precisar usar o botão "Reset" do editor para ver o novo template (o editor persiste o progresso).
- Se `explanation.md` não existir, a seção de descrição ficará vazia.
- Garanta que seu `index.html` contenha os elementos que seu código espera (ex.: `<canvas id="myCanvas">`).

#### 10) Como enviar seu curso

1. Faça um fork do repositório.
2. Crie um branch (ex.: `feat/curso-meu-curso`).
3. Adicione os arquivos conforme este guia e rode localmente.
4. Abra um Pull Request descrevendo o curso, objetivo e lições.
5. Vamos revisar e, estando tudo ok, aprovar a publicação.
