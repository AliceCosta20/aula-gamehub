import * as estudioModel from "../models/estudioModel.js";
import { textoValido } from "../utils/validacoes.js";

// Listar todos os estúdios
export function listar(req, res, next) {
    estudioModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
    });
}

// Buscar estúdio por ID
export function buscarPorId(req, res, next) {
    const { id } = req.params;

    estudioModel.buscarPorId(id, (erro, resultado) => {
        if (erro) return next(erro);
        if (!resultado || resultado.length === 0) {
            return res.status(404).json({ mensagem: "Estúdio não encontrado." });
        }
        return res.status(200).json(resultado[0]);
    });
}

// Criar novo estúdio
export function criar(req, res, next) {
    const { nome } = req.body;

    if (!textoValido(nome)) {
        return res.status(400).json({ mensagem: "O nome do estúdio é obrigatório e deve ser um texto válido." });
    }

    estudioModel.criar({ nome }, (erro, resultado) => {
        if (erro) return next(erro);
        return res.status(201).json({ 
            mensagem: "Estúdio criado com sucesso!", 
            id: resultado.insertId 
        });
    });
}

// Atualizar estúdio por ID
export function atualizar(req, res, next) {
    const { id } = req.params;
    const { nome } = req.body;

    if (!textoValido(nome)) {
        return res.status(400).json({ mensagem: "O nome do estúdio é obrigatório e deve ser um texto válido." });
    }

    estudioModel.atualizar(id, { nome }, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: "Estúdio não encontrado para atualização." });
        }
        return res.status(200).json({ mensagem: "Estúdio atualizado com sucesso!" });
    });
}

// Deletar estúdio por ID
export function deletar(req, res, next) {
    const { id } = req.params;

    estudioModel.deletar(id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: "Estúdio não encontrado para exclusão." });
        }
        return res.status(200).json({ mensagem: "Estúdio removido com sucesso!" });
    });
}