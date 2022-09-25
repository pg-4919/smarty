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
        .addStringOption(option =>
            option.setName("extension")
                .setDescription("What file type to display the image as")
                .setRequired(false)
                .addChoices(
                    { name: "png", value: "png" },
                    { name: "jpg", value: "jpg" },
                    { name: "jpeg", value: "jpeg" },
                    { name: "webp", value: "webp" },
                    { name: "gif", value: "gif"}
                )
        )
        .toJSON(),

    async respond(interaction) {
        const member = interaction.member;
        const guild = interaction.guild;

        const target = interaction.options.getMember("target") || member;
        const extension = interaction.options.getString("filetype") || "png";

        const avatarUrl = target.displayAvatarURL({ size: 4096, extension: extension });

        const embed = new discord.EmbedBuilder()
            .setColor("#2F3136")
            .setImage(avatarUrl)
            .setTimestamp()
            .setFooter({ text: `enhanced ${target.displayName}"s face`, iconURL: member.displayAvatarURL() });

        interaction.reply({ embeds: [embed] });

        return;
    },

    fetch() {
        return spoofs;
    }
}