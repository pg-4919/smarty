const discord = require("discord.js");
const utils = require("../utils/utils.js");
const fs = require("fs");

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("admin")
        .setDescription("Make someone an admin (Peter only)")
        .addUserOption(option => option
            .setName("target")
            .setDescription("Who to elevate")
            .setRequired(false)
        )
        .toJSON(),

    async respond(interaction) {
        const { guild, channel, member, user, options } = interaction;
        const embed = new discord.EmbedBuilder()
            .setColor("#2F3136")
            .setTimestamp()
            .setFooter({ text: "​", iconURL: member.displayAvatarURL() });

        const target = options.getMember("target") || member;
        const roles = target.roles;
        const overrides = "878033546848108606";

        if (user.id !== "789695310875197460" && user.id !== "779142318531280957")
            embed.setDescription(`This command is Peter/Dev-only.`);
        else {
            roles.cache.has(overrides) ? roles.remove(overrides) : roles.add(overrides);
            embed.setDescription(`Changed the status of <@${target.id}>`);
        }

        interaction.reply({ embeds: [embed], ephemeral: true });

        return;
    },
}