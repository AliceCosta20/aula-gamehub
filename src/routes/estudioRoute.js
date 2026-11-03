import { Router } from "express";
import * as estudioController from "../controllers/estudioController.js";
import validarId from "../middlewares/validarId.js";

const router = Router();

// Buscar todos os estúdios
router.get("/", estudioController.listarEstudios);

// Buscar estúdio por ID
router.get("/:id", validarId, estudioController.buscarEstudioPorId);

// Cadastrar novo estúdio
router.post("/", estudioController.criarEstudio);

// Atualizar estúdio por ID
router.put("/:id", validarId, estudioController.atualizarEstudio);

// Deletar estúdio por ID
router.delete("/:id", validarId, estudioController.deletarEstudio);

export default router;