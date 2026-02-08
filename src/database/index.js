import mongoose, { model } from "mongoose";
import { env } from "#settings";
import chalk from "chalk";

// Importando os schemas
import { guildSchema } from "./schemas/guild.js";
import { memberSchema } from "./schemas/member.js";

try {
    // Conectando com a URI do seu .env
    await mongoose.connect(env.MONGO_URI, { dbName: "database" });
    console.log(chalk.green("🍃 [DATABASE] MongoDB conectado com sucesso!"));
}
catch (err) {
    console.error(chalk.red("❌ [DATABASE] Erro:"), err);
    process.exit(1);
}

// Objeto central de modelos (Exatamente como você sugeriu)
export const db = {
    guilds: model("guild", guildSchema, "guilds"),
    members: model("member", memberSchema, "members"),
};

// Exporta os schemas caso precise criar sub-schemas depois
export * from "./schemas/user.js";
export * from "./schemas/guild.js";