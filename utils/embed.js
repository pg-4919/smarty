const discord = require("discord.js");

module.exports = member => {
    return new discord.EmbedBuilder()
        .setColor("#2F3136")
        .setTimestamp()
        .setFooter({ text: "​", iconURL: member.displayAvatarURL() }) // Unicode empty character
}