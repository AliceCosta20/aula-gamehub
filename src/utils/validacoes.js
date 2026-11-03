export function textoValido(texto, tamanhoMaximo) {
    if (typeof texto !== "string") return false;
    const textoLimpo = texto.trim();
    if (textoLimpo.length === 0) return false;
    if (tamanhoMaximo && textoLimpo.length > tamanhoMaximo) return false;
    return true;
}

export function inteiroPositivo(valor) {
    const numero = Number(valor);
    return Number.isInteger(numero) && numero > 0;
}