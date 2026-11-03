import * as jogadorModel from "../models/jogadorModel.js";
import { textoValido } from "../utils/validacoes.js";

// Listar todos os estúdios
export function listar(req, res, next) {
    jogadorModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
    });
}

// Buscar estúdio por ID
export function buscarPorId(req, res, next) {
    const { id } = req.params;

    jogadorModel.buscarPorId(id, (erro, resultado) => {
        if (erro) return next(erro);
        if (!resultado || resultado.length === 0) {
            return res.status(404).json({ mensagem: "Jogador não encontrado." });
        }
        return res.status(200).json(resultado[0]);
    });
}

// Criar novo estúdio
export function criar(req, res, next) {
    const { nome, email } = req.body;

    if (!textoValido(nome) || !textoValido(email)) {
        return res.status(400).json({ mensagem: "O nome do jogador é obrigatório e deve ser um texto válido." });
    }

    jogadorModel.criar({ nome, email}, (erro, resultado) => {
        if (erro) return next(erro);
        return res.status(201).json({ 
            mensagem: "Jogador criado com sucesso!", 
            id: resultado.insertId 
        });
    });
}

// Atualizar estúdio por ID
export function atualizar(req, res, next) {
    const { id } = req.params;
    const { nome, email } = req.body;

    if (!textoValido(nome) || !textoValido(email)) {
        return res.status(400).json({ mensagem: "O nome do jogador é obrigatório e deve ser um texto válido." });
    }

    jogadorModelo.atualizar(id, { nome, email}, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: "Jogador não encontrado para atualização." });
        }
        return res.status(200).json({ mensagem: "Jogador atualizado com sucesso!" });
    });
}

// Deletar estúdio por ID
export function deletar(req, res, next) {
    const { id } = req.params;

    jogadorModel.deletar(id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: "Jogador não encontrado para exclusão." });
        }
        return res.status(200).json({ mensagem: "Jogador removido com sucesso!" });
    });
}