const discord = require("discord.js");
const utils = require("../utils/utils.js")

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("ping")
        .setDescription("Ping the bot")
        .toJSON(),

    async respond(interaction) {
        const { client, member, createdTimestamp } = interaction;
        const latency = Date.now() - createdTimestamp;
        const ping = client.ws.ping;

        const embed = utils.embed(member).setDescription(`The shit load is up!\n- Latency is \`${latency} ms\` \n- API ping is \`${ping} ms\``)
        await interaction.reply({ embeds: [embed], ephemeral: true, components: [utils.share.button()] });
        
        return interaction;
    }
}