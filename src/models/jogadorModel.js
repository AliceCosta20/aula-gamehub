import conexao from "../config/db.js";

// Listar todos os jogadores
export function listar(callback) {
    const sql = "SELECT * FROM jogadores";
    conexao.query(sql, callback);
}

// Buscar jogador por ID
export function buscarPorId(id, callback) {
    const sql = "SELECT * FROM jogadores WHERE id = ?";
    conexao.query(sql, [id], callback);
}

// Criar novo jogador
export function criar(dados, callback) {
    const sql = "INSERT INTO jogadores (nome, email) VALUES (?, ?)";
    conexao.query(sql, [dados.nome, dados.email], callback);
}

// Atualizar jogador por ID
export function atualizar(id, dados, callback) {
    const sql = "UPDATE jogadores SET nome = ?, email = ? WHERE id = ?";
    conexao.query(sql, [dados.nome, dados.email, id], callback);
}

// Deletar jogador por ID
export function deletar(id, callback) {
    const sql = "DELETE FROM jogadores WHERE id = ?";
    conexao.query(sql, [id], callback);
}