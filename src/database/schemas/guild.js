import { Schema } from "mongoose";

export const guildSchema = new Schema({
    id: { type: String, required: true, unique: true },
    prefix: { type: String, default: "!" },
    logsChannel: { type: String, default: null },
    welcomeChannel: { type: String, default: null },
}, { 
    timestamps: true 
});