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
        const { guild, channel, member, user, options } = interaction;
        const embed = new discord.EmbedBuilder()
            .setColor("#2F3136")
            .setTimestamp()
            .setFooter({ text: "​", iconURL: member.displayAvatarURL() });

        const target = options.getMember("target") || member;
        const avatar = target.displayAvatarURL({ size: 4096 });

        embed.setImage(avatar);

        interaction.reply({ embeds: [embed] });

        return;
    }
}