import { inteiroPositivo } from "../utils/validacoes.js";

export function validarId(req, res, next) {
    const id = Number(req.params.id);
    if (!inteiroPositivo(id)) {
        return res.status(400).json({ erro: "ID inválido fornecido" });
    }
    req.id = id;
    next();
}