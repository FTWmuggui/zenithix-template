import { Schema } from "mongoose";

export const memberSchema = new Schema({
    guildId: { type: String, required: true },
    userId: { type: String, required: true },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 0 },
    warnings: { type: Array, default: [] },
}, { 
    timestamps: true 
});

// Criamos um índice único para que não existam duplicatas do mesmo usuário na mesma guilda
memberSchema.index({ guildId: 1, userId: 1 }, { unique: true });