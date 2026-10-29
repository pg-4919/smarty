const discord = require("discord.js");
const utils = require("../utils/utils.js")

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("logs")
        .setDescription("Check bot logs")
        .toJSON(),

    async respond(interaction) {
        const { member, client } = interaction;
        const embed = utils.embed(member).setDescription(client.logs.join("\n"));
        await interaction.reply({ embeds: [embed], ephemeral: true, components: [utils.share.button()] });
        
        return interaction;
    }
}