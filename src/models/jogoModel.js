import conexao from "../config/db.js";

// Listar todos os jogos
export function listar(callback) {
    const sql = "SELECT * FROM jogos";
    conexao.query(sql, callback);
}

// Buscar jogo por ID
export function buscarPorId(id, callback) {
    const sql = "SELECT * FROM jogos WHERE id = ?";
    conexao.query(sql, [id], callback);
}

// Criar novo jogo
export function criar(dados, callback) {
    const sql = "INSERT INTO jogos (titulo, genero, estudio_id) VALUES (?, ?, ?)";
    conexao.query(sql, [dados.titulo, dados.genero, dados.estudio_id], callback);
}

// Atualizar jogo por ID
export function atualizar(id, dados, callback) {
    const sql = "UPDATE jogos SET titulo = ?, genero = ?, estudio_id = ? WHERE id = ?";
    conexao.query(sql, [dados.titulo, dados.genero, dados.estudio_id, id], callback);
}

// Deletar jogo por ID
export function deletar(id, callback) {
    const sql = "DELETE FROM jogos WHERE id = ?";
    conexao.query(sql, [id], callback);
}