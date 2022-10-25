const discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports = {
    global: true,
    
    data: new discord.SlashCommandBuilder()
        .setName("ping")
        .setDescription("Check how laggy the bot is")
        .toJSON(),

    async respond(interaction) {
        const { member, createdTimestamp } = interaction;
        
        const embed = new discord.EmbedBuilder()
            .setColor("#2F3136")
            .setTimestamp()
            .setDescription(`The bot is up and latency is ${Date.now() - createdTimestamp} ms.`)
            .setFooter({ text: "​", iconURL: member.displayAvatarURL() });
        
        return interaction.reply({ embeds: [embed]});
    }
}