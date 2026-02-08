import { Collection, ApplicationCommandType } from "discord.js";
import { isPromise } from "node:util/types";
import ck from "chalk";

export class Command {
    static commands = new Collection();
    static handlers = new Collection();

    constructor(data) {
        this.data = data;
        data.type ??= ApplicationCommandType.ChatInput;
        Command.commands.set(data.name, data);
        
        // Guardamos o handler para executar depois
        Command.handlers.set(data.name, {
            run: data.run,
            autocomplete: data.autocomplete
        });
    }

    // O método que estava faltando no seu index.js!
    static async onInteraction(interaction, onError) {
        const command = Command.handlers.get(interaction.commandName);
        if (!command) return;

        try {
            if (interaction.isChatInputCommand()) {
                const execution = command.run(interaction);
                if (isPromise(execution) && onError) {
                    execution.catch(error => onError(error, interaction));
                }
            }
            if (interaction.isAutocomplete() && command.autocomplete) {
                command.autocomplete(interaction);
            }
        } catch (error) {
            if (onError) onError(error, interaction);
            else throw error;
        }
    }

    static async register(client) {
        try {
            await client.application.commands.set(Array.from(this.commands.values()));
            console.log(ck.green(`[COMMANDS] ${this.commands.size} comandos registrados com sucesso!`));
        } catch (err) {
            console.error(ck.red("[COMMANDS] Erro ao registrar:"), err);
        }
    }
}