# 📘 README — Fluxo Completo do App **Quiz Game**

> Este README descreve **como o app foi construído**. 
> O projeto utiliza **React Native**, **React Navigation**, **react-native-safe-area-context** e **SQLite** via `expo-sqlite`.

---

# 🧭 Visão Geral do Fluxo


(App inicia)

└── App.js 

    ├── inicializa o banco via initDB

    └── registra as rotas de navegação

        └── Home

            ├── Temas (CRUD de temas)

            │   └── QuestionsScreen (CRUD de perguntas por tema)

            └── SelecionarTema (escolhe um tema + nº de perguntas)

                └── Quiz (responde as perguntas)

                    └── ResultScreen (mostra acertos erros + resumo)

---

# 🧭 Visão Geral do Fluxo

---

### 📌 `02-estrutura-base.md`

# 🗂️ Estrutura Base

- **`db.js`** → abertura do banco, criação de tabelas e funções de CRUD (temas/perguntas).

- **`styles.js`** → estilos globais (tema escuro, botões, listas, textos).

- **`CustomSelect.js`** → seletor modal reutilizável (usado para escolher a alternativa correta).

- **`screens/*.js`** → telas do app: Home, Temas, QuestionsScreen, SelecionarTema, Quiz, ResultScreen.

- **`App.js`** → provê `NavigationContainer`, `Stack.Navigator` e chama `initDB()` no `useEffect`.

---

# 1) Fundamentos de Dados (SQLite)

## 1.1 Criação e Inicialização
- `initDB()` abre (ou cria) `quiz.db` e garante as tabelas `temas` e `perguntas`.
- Executado **uma única vez** no boot do app (`App.js`).

**Esquema do Banco:**
- `temas (id, nome UNIQUE)`
- `perguntas (id, texto, tema_id, alt1..alt4, correta)` com **FK** para `temas.id`.

---

## 1.2 Operações CRUD
- **Temas**: `fetchTemas()`, `insertTema(nome)`, `deleteTema(id)` (apaga perguntas vinculadas).
- **Perguntas**: `insertPergunta({...})`, `fetchPerguntasByTema(tema_id)`, `updatePergunta({...})`, `deletePergunta(id)`.

**Particularidades:**
- `fetchTemas()` retorna cada tema já com a **quantidade de perguntas**.
- Exclusão de tema remove também suas perguntas associadas.

# 2) Estilos Globais

- **Tema escuro** com cores de contraste (preto, branco, amarelo, roxo).
- **Principais estilos**:
  - Títulos → `title`, `label`
  - Inputs → `input`
  - Botões → `button`, `buttonSmall`, `buttonText`
  - Listas → `listItem`, `listText`, `subText`
  - Quiz → `optionButton`, `optionText`

# 3) Componente Reutilizável: `CustomSelect`

- Modal de seleção de opções (`label`/`value`).
- **Props:** `options`, `selected`, `onSelect`.
- Utilizado em **QuestionsScreen** para definir a alternativa correta.
- Exibe botão com valor atual + modal listando opções.

# 4) Navegação e Bootstrap (App.js)

- Estrutura principal com **`NavigationContainer`** + `Stack.Navigator`.
- Rotas registradas: `Home`, `Temas`, `QuestionsScreen`, `SelecionarTema`, `Quiz`, `ResultScreen`.
- `initDB()` é chamado no `useEffect` para inicializar o banco antes de qualquer operação.

# 5) Telas (em ordem do fluxo)

## 5.1 Home
- Tela inicial.
- Ações:
  - **Gerenciar Temas** → `Temas`.
  - **Iniciar Quiz** → `SelecionarTema`.

---

## 5.2 Temas
- CRUD de temas.
- Lista com **nome + quantidade de perguntas**.
- Ações:
  - **Adicionar Tema** (validação de vazio).
  - **Excluir** (confirmação + cascata de perguntas).
- Toque no tema → `QuestionsScreen`.

---

## 5.3 QuestionsScreen
- CRUD de perguntas de um tema.
- Campos: enunciado + 4 alternativas + seletor de correta.
- Funcionalidades:
  - **Adicionar**: insere pergunta (sem duplicidade).
  - **Alterar**: edita pergunta selecionada.
  - **Excluir**: remove pergunta.
- Lista em `FlatList` com enunciados.
- Valida duplicidade de enunciado (case-insensitive).

---

## 5.4 SelecionarTema
- Usuário escolhe tema e número de perguntas.
- Fluxo:
  - Valida número ≥ 1.
  - Busca perguntas do tema.
  - Se indisponível ou maior que total → alerta.
  - Seleciona primeiras N perguntas → `Quiz`.

---

## 5.5 Quiz
- Recebe `{ tema, perguntas }`.
- Estados: `index` e `respostas`.
- Ao selecionar alternativa:
  - Registra em `respostas[index]`.
  - Avança para próxima ou calcula `score`.
  - Ao final → `ResultScreen` com `replace`.

---

## 5.6 ResultScreen
- Recebe `{ perguntas, respostas, score, tema }`.
- Mostra:
  - **Score total** + barra de progresso (percentual).
  - Revisão: pergunta, resposta do usuário, correta (verde/vermelho).
- Botões:
  - **Jogar novamente** → SelecionarTema.
  - **Home**.

# 6) Conexões entre Telas

- **Home → Temas → QuestionsScreen**
- **Home → SelecionarTema → Quiz → ResultScreen**
- **ResultScreen → SelecionarTema ou Home**

# 7) Regras e Validações

- **Temas**: nome único e obrigatório, exclusão em cascata.
- **Perguntas**: todos os campos obrigatórios, enunciado não pode repetir, edição protegida.
- **SelecionarTema**: número deve ser válido e ≤ perguntas disponíveis.
- **Quiz**: registra resposta e calcula score corretamente.

# 8) Decisões de UX/UI

- Tema escuro com contraste.
- Botões grandes e centralizados.
- Feedback visual (verde/vermelho).
- Navegação simplificada (sem headers, botões próprios).

# 9) Checklist de Construção

1. Criar DB e funções.
2. Definir estilos globais.
3. Configurar navegação em `App.js`.
4. Criar **Home**.
5. Criar **Temas** (CRUD).
6. Criar **QuestionsScreen** (CRUD).
7. Criar **SelecionarTema** (validação e envio).
8. Criar **Quiz** (execução e score).
9. Criar **ResultScreen** (resultado + revisão).




