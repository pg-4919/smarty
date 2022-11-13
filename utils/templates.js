const discord = require("discord.js");

module.exports = {
    embed(member) {
        return new discord.EmbedBuilder()
            .setColor("#2F3136")
            .setTimestamp()
            .setFooter({ text: "​", iconURL: member.displayAvatarURL() })
    },
    share(disabled = false) {
        
    },
}