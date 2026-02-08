// ./src/discord/base/Responder.js
import { createRouter } from "radix3";

export const ResponderType = {
    Button: "button",
    Select: "select",
    Modal: "modal",
    All: "all"
};

export class Responder {
    static router = createRouter();

    constructor(data) {
        Responder.router.insert(data.customId, data);
    }

    static async onInteraction(interaction) {
        if (!interaction.isMessageComponent() && !interaction.isModalSubmit()) return;

        const { customId, values } = interaction;
        
        // 1. Tenta achar pelo caminho DINÂMICO (Ex: ticket/admin/menu/call)
        let path = customId;
        if (interaction.isAnySelectMenu() && values?.length > 0) {
            path = `${customId}/${values[0]}`;
        }

        let matched = Responder.router.lookup(path);

        // 2. Se não achou no dinâmico, tenta pelo ID FIXO (Ex: selectMenu_ticket)
        if (!matched) {
            matched = Responder.router.lookup(customId);
        }

        if (!matched) return;

        // 3. Validação de tipo (opcional, mas bom pra segurança)
        const isButton = interaction.isButton() && matched.type === ResponderType.Button;
        const isSelect = interaction.isAnySelectMenu() && matched.type === ResponderType.Select;
        const isModal = interaction.isModalSubmit() && matched.type === ResponderType.Modal;
        const isAll = matched.type === ResponderType.All;

        if (isButton || isSelect || isModal || isAll) {
            try {
                await matched.run(interaction, matched.params || {});
            } catch (error) {
                console.error(`[Responder Error] ${customId}:`, error);
            }
        }
    }
}