const discord = require("discord.js");
const utils = require("../utils/utils.js");
const fs = require("fs");

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("avatar")
        .setDescription("See another person's avatar (or your own)")
        .addUserOption(option => option
            .setName("target")
            .setDescription("Whose avatar to enhance (leave blank for yourself)")
            .setRequired(false)
        )
        .toJSON(),

    async respond(interaction) {
        const member = interaction.member;
        const guild = interaction.guild;

        const target = interaction.options.getMember("target") || member;

        const avatarUrl = target.displayAvatarURL({ size: 4096 });

        const embed = new discord.EmbedBuilder()
            .setColor("#2F3136")
            .setImage(avatarUrl)
            .setTimestamp()
            .setFooter({ text: " ", iconURL: member.displayAvatarURL() });

        interaction.reply({ embeds: [embed] });

        return;
    },

    fetch() {
        return spoofs;
    }
}