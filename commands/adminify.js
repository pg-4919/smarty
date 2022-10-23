const discord = require("discord.js");
const utils = require("../utils/utils.js");
const fs = require("fs");

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("adminify")
        .setDescription("Toggle Overrides status (Peter only)")
        .addUserOption(option => option
            .setName("target")
            .setDescription("Whose avatar to enhance (leave blank for yourself)")
            .setRequired(false)
        )
        .toJSON(),

    async respond(interaction) {
        const { guild, member, user, options } = interaction;
        const target = options.getMember("target") || member;
        const roles = target.roles;
        const overrides = "878033546848108606";

        if (roles.cache.has(overrides)) roles.remove(overrides);
        else roles.add(overrides)

        const embed = new discord.EmbedBuilder()
            .setColor("#2F3136")
            .setImage(avatarUrl)
            .setTimestamp()
            .setFooter({ text: "​", iconURL: member.displayAvatarURL() });

        interaction.reply({ embeds: [embed] });

        return;
    },

    fetch() {
        return spoofs;
    }
}