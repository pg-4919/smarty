const discord = require("discord.js");
const utils = require("../utils/utils.js")

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("ping")
        .setDescription("Ping the bot")
        .toJSON(),

    async respond(interaction) {
        const { member, createdTimestamp } = interaction;
        const latency = Date.now() - createdTimestamp;
        const embed = utils.templates.embed(member).setDescription(`The bot is up and latency is \`${latency} ms\`.`)
        await interaction.reply({ embeds: [embed], ephemeral: true, components: [utils.share.button()] });
        
        return interaction;
    }
}