import { BaseInteraction, CommandInteraction, Interaction, SlashCommandBuilder } from "discord.js";

export default class Command {
    identifier: string;
    elevated: boolean;
    
    handler: Function;
    builder: SlashCommandBuilder;

    constructor(options: Omit<NonNullable<Command>,"respond">) {
        Object.assign(this, options);
    }

    async respond(interaction: CommandInteraction) : Promise<CommandInteraction> {
        await this.handler(interaction);
        return interaction;
    }
}