import { CommandInteraction, GuildMember, SimpleIdentifyThrottler, SlashCommandBuilder } from "discord.js";
import Command from "../structures/command.js";

export default new Command({
    identifier: "admin",
    elevated: true,

    builder: new SlashCommandBuilder()
        .setDescription("Add or remove admin privileges")
        .addUserOption(option => option
            .setName("target")
            .setDescription("Whose status to toggle")
            .setRequired(false)
        )
        .setName("admin"),

    handler: async (interaction: CommandInteraction) => {
        const { member, options, client } = interaction;

        const target = (options.getMember("target") || member) as GuildMember;
        target.user
    
        return interaction;
    }
});

/*
const discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("admin")
        .setDescription("Add or remove admin privileges")
        .addUserOption(option => option.setName("target")
            .setDescription("Whose status to toggle")
            .setRequired(false)
        )
        .toJSON(),

    async respond(interaction) {
        const { member, user, options, client } = interaction;
        const embed = utils.embed(member);

        const target = options.getMember("target") || member;
        const roles = target.roles;
        const overrides = client.config.roles.overrides;

        if (!client.config.admins.includes(user.id))
            embed.setDescription(`You don't have permission to use this command.`);
        else {
            await roles.cache.has(overrides) ? await roles.remove(overrides) : await roles.add(overrides);
            embed.setDescription(`Changed the status of <@${target.id}> to \`${roles.cache.has(overrides) ? "admin" : "nonadmin"}\``);
        }

        await interaction.reply({ embeds: [embed], ephemeral: true, components: [utils.share.button()] });
        return interaction;
        */