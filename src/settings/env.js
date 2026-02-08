import { z } from "zod";

const envSchema = z.object({
    BOT_TOKEN: z.string({ description: "Token do Bot é obrigatório" }).min(10),
    MONGO_URI: z.string({ description: "Link do MongoDB é obrigatório" }).min(1),

    // Aqui você pode adicionar CLIENT_ID, etc.
});

// Parseia o process.env e exporta já validado
export const env = envSchema.parse({
    BOT_TOKEN: process.env.TOKEN, // Ajuste conforme o nome no seu .env
    MONGO_URI: process.env.MONGO_URI,
});