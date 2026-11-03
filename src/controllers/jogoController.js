import * as jogoModel from "../models/jogoModel.js";
import { textoValido, numeroValido } from "../utils/validacoes.js";

// Listar todos os jogos
export function listar(req, res, next) {
    jogoModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
    });
}

// Buscar jogo por ID
export function buscarPorId(req, res, next) {
    const { id } = req.params;

    jogoModel.buscarPorId(id, (erro, resultado) => {
        if (erro) return next(erro);
        if (!resultado || resultado.length === 0) {
            return res.status(404).json({ mensagem: "Jogo não encontrado." });
        }
        return res.status(200).json(resultado[0]);
    });
}

// Criar novo jogo
export function criar(req, res, next) {
    const { titulo, genero, estudio_id } = req.body;

    if (!textoValido(titulo) || !textoValido(genero) || !numeroValido(estudio_id)) {
        return res.status(400).json({ 
            mensagem: "Campos 'titulo', 'genero' e 'estudio_id' são obrigatórios e devem ser válidos." 
        });
    }

    jogoModel.criar({ titulo, genero, estudio_id }, (erro, resultado) => {
        if (erro) return next(erro);
        return res.status(201).json({ 
            mensagem: "Jogo cadastrado com sucesso!", 
            id: resultado.insertId 
        });
    });
}

// Atualizar jogo por ID
export function atualizar(req, res, next) {
    const { id } = req.params;
    const { titulo, genero, estudio_id } = req.body;

    if (!textoValido(titulo) || !textoValido(genero) || !numeroValido(estudio_id)) {
        return res.status(400).json({ 
            mensagem: "Campos 'titulo', 'genero' e 'estudio_id' são obrigatórios e devem ser válidos." 
        });
    }

    jogoModel.atualizar(id, { titulo, genero, estudio_id }, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: "Jogo não encontrado para atualização." });
        }
        return res.status(200).json({ mensagem: "Jogo atualizado com sucesso!" });
    });
}

// Deletar jogo por ID
export function deletar(req, res, next) {
    const { id } = req.params;

    jogoModel.deletar(id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: "Jogo não encontrado para exclusão." });
        }
        return res.status(200).json({ mensagem: "Jogo removido com sucesso!" });
    });
}