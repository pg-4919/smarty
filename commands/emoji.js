const discord = require("discord.js");
const utils = require("../utils/utils.js");
const fs = require("fs");

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("emoji")
        .setDescription("Get the source file of an emoji")
        .addStringOption(option => option
            .setName("emoji")
            .setDescription("Which emoji to enhance")
            .setRequired(true)
        )
        .toJSON(),
    async respond(interaction) {
        const { guild, member, options } = interaction;
        const embed = utils.embed(member);
        const name = options.getString("emoji");
        const emoji = guild.emojis.cache.find(emoji => emoji.name === name);

        if (emoji) embed.setImage(emoji.url);
        else embed.setDescription("Couldn't find that custom emoji.");

        await interaction.reply({ embeds: [embed], ephemeral: true, components: [utils.share.button()] });

        return interaction;
    }
}