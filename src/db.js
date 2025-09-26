// Importa o módulo SQLite do Expo, que permite usar banco de dados local
import * as SQLite from "expo-sqlite";

let db; // Variável global para armazenar a conexão com o banco

/**
 * Função responsável por inicializar o banco de dados SQLite.
 * Caso não exista ainda, cria as tabelas `temas` e `perguntas`.
 */
export async function initDB() {
  // Abre a base de dados apenas uma vez (singleton)
  if (!db) {
    db = await SQLite.openDatabaseAsync("quiz.db");
  }

  // Cria as tabelas se não existirem
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS temas (
      id INTEGER PRIMARY KEY AUTOINCREMENT, -- ID único gerado automaticamente
      nome TEXT UNIQUE NOT NULL             -- Nome do tema (não pode ser duplicado)
    );

    CREATE TABLE IF NOT EXISTS perguntas (
      id INTEGER PRIMARY KEY AUTOINCREMENT, -- ID único da pergunta
      texto TEXT NOT NULL,                  -- Texto do enunciado
      tema_id INTEGER NOT NULL,             -- Chave estrangeira que liga a pergunta ao tema
      alt1 TEXT NOT NULL,                   -- Alternativa 1
      alt2 TEXT NOT NULL,                   -- Alternativa 2
      alt3 TEXT NOT NULL,                   -- Alternativa 3
      alt4 TEXT NOT NULL,                   -- Alternativa 4
      correta INTEGER NOT NULL,             -- Índice da resposta correta (1 a 4)
      FOREIGN KEY (tema_id) REFERENCES temas (id) -- Garante integridade referencial
    );
  `);

  return db; // Retorna a instância do banco
}

// ----------------- FUNÇÕES RELACIONADAS A "TEMAS" -----------------

/**
 * Busca todos os temas cadastrados no banco.
 * Também retorna a quantidade de perguntas associadas a cada tema.
 */
export async function fetchTemas() {
  return await db.getAllAsync(
    `SELECT t.*, 
       (SELECT COUNT(*) FROM perguntas p WHERE p.tema_id=t.id) as qtd 
     FROM temas t`
  );
}

/**
 * Insere um novo tema na tabela `temas`.
 * @param {string} nome - Nome do tema que será adicionado
 */
export async function insertTema(nome) {
  return await db.runAsync("INSERT INTO temas (nome) VALUES (?)", [nome]);
}

/**
 * Exclui um tema específico e todas as perguntas ligadas a ele.
 * @param {number} id - ID do tema a ser excluído
 */
export async function deleteTema(id) {
  // Remove as perguntas relacionadas ao tema
  await db.runAsync("DELETE FROM perguntas WHERE tema_id = ?", [id]);
  // Depois remove o próprio tema
  return await db.runAsync("DELETE FROM temas WHERE id = ?", [id]);
}

/**
 * Atualiza o nome de um tema existente.
 * @param {number} id - ID do tema
 * @param {string} novoNome - Novo nome para o tema
 */
export async function updateTema(id, novoNome) {
  return await db.runAsync(
    "UPDATE temas SET nome = ? WHERE id = ?",
    [novoNome, id]
  );
}

// ----------------- FUNÇÕES RELACIONADAS A "PERGUNTAS" -----------------

/**
 * Insere uma nova pergunta no banco.
 * @param {object} pergunta - Objeto com os dados da pergunta
 *  - texto: enunciado da pergunta
 *  - tema_id: ID do tema associado
 *  - alt1..alt4: alternativas
 *  - correta: índice da alternativa correta (1 a 4)
 */
export async function insertPergunta({ texto, tema_id, alt1, alt2, alt3, alt4, correta }) {
  return await db.runAsync(
    `INSERT INTO perguntas (texto, tema_id, alt1, alt2, alt3, alt4, correta)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [texto, tema_id, alt1, alt2, alt3, alt4, correta]
  );
}

/**
 * Busca todas as perguntas relacionadas a um tema específico.
 * @param {number} tema_id - ID do tema
 */
export async function fetchPerguntasByTema(tema_id) {
  return await db.getAllAsync("SELECT * FROM perguntas WHERE tema_id = ?", [tema_id]);
}

/**
 * Atualiza uma pergunta existente.
 * @param {object} pergunta - Objeto com os dados da pergunta
 *  - id: identificador da pergunta
 *  - texto: novo enunciado
 *  - alt1..alt4: novas alternativas
 *  - correta: nova resposta correta
 */
export async function updatePergunta({ id, texto, alt1, alt2, alt3, alt4, correta }) {
  return await db.runAsync(
    `UPDATE perguntas 
     SET texto=?, alt1=?, alt2=?, alt3=?, alt4=?, correta=? 
     WHERE id=?`,
    [texto, alt1, alt2, alt3, alt4, correta, id]
  );
}

/**
 * Exclui uma pergunta do banco.
 * @param {number} id - ID da pergunta
 */
export async function deletePergunta(id) {
  return await db.runAsync(`DELETE FROM perguntas WHERE id=?`, [id]);
}

// Exporta a instância do banco para que possa ser usada em outros arquivos
export default db;
