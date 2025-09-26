import * as SQLite from "expo-sqlite";

let db;

// Inicializa banco e tabelas
export async function initDB() {
  if (!db) {
    db = await SQLite.openDatabaseAsync("quiz.db");
  }

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS temas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS perguntas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      texto TEXT NOT NULL,
      tema_id INTEGER NOT NULL,
      alt1 TEXT NOT NULL,
      alt2 TEXT NOT NULL,
      alt3 TEXT NOT NULL,
      alt4 TEXT NOT NULL,
      correta INTEGER NOT NULL,
      FOREIGN KEY (tema_id) REFERENCES temas (id)
    );
  `);

  return db;
}

// ----------------- Temas -----------------
export async function fetchTemas() {
  return await db.getAllAsync(
    `SELECT t.*, 
       (SELECT COUNT(*) FROM perguntas p WHERE p.tema_id=t.id) as qtd 
     FROM temas t`
  );
}

export async function insertTema(nome) {
  return await db.runAsync("INSERT INTO temas (nome) VALUES (?)", [nome]);
}


export async function deleteTema(id) {
  // Ao excluir um tema, também é interessante excluir suas perguntas
  await db.runAsync("DELETE FROM perguntas WHERE tema_id = ?", [id]);
  return await db.runAsync("DELETE FROM temas WHERE id = ?", [id]);
}

// ----------------- Perguntas -----------------
export async function insertPergunta({ texto, tema_id, alt1, alt2, alt3, alt4, correta }) {
  return await db.runAsync(
    `INSERT INTO perguntas (texto, tema_id, alt1, alt2, alt3, alt4, correta)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [texto, tema_id, alt1, alt2, alt3, alt4, correta]
  );
}

export async function fetchPerguntasByTema(tema_id) {
  return await db.getAllAsync("SELECT * FROM perguntas WHERE tema_id = ?", [tema_id]);
}

export async function updatePergunta({ id, texto, alt1, alt2, alt3, alt4, correta }) {
  return await db.runAsync(
    `UPDATE perguntas 
     SET texto=?, alt1=?, alt2=?, alt3=?, alt4=?, correta=? 
     WHERE id=?`,
    [texto, alt1, alt2, alt3, alt4, correta, id]
  );
}

export async function deletePergunta(id) {
  return await db.runAsync(`DELETE FROM perguntas WHERE id=?`, [id]);
}

export default db;