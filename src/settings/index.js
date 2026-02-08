import "./global.js"; // Garante que __rootname exista antes de tudo
import log from "consola";
export * from "./env.js"; // Exporta o objeto 'env' validado
export * from "./error.js"; // Exporta a função 'onError'
import settings from "../../settings.json" with { type: "json" };
export { settings, log };