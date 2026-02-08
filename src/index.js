import { Client, GatewayIntentBits } from "discord.js";
import { env, onError } from "#settings";
import { Command, Responder, loadModules, registerEvents } from "#base"; 
import "./database/index.js"; // Inicia a conexão da DB imediatamente
import ck from "chalk";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ]
});

async function bootstrap() {
    await loadModules();     
    registerEvents(client);  

    client.on("clientReady", async () => {
        await Command.register(client);
        console.log(ck.green(`[ONLINE] ${client.user.tag} bot ligado com sucesso!`));
    });

    client.on("interactionCreate", async (interaction) => {
        if (interaction.isChatInputCommand() || interaction.isAutocomplete()) {
            Command.onInteraction(interaction, (error) => onError(error, client));
            return;
        }
        await Responder.onInteraction(interaction);
    });

    await client.login(env.BOT_TOKEN);
}

process.on("unhandledRejection", (error) => onError(error, client));
process.on("uncaughtException", (error) => onError(error, client));

bootstrap();