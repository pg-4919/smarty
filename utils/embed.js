const discord = require("discord.js");

module.exports = {
    default(description, member, footer) {
        return new discord.EmbedBuilder()
            .setColor("#2F3136")
            .setDescription(description)
            .setTimestamp()
            .setFooter({ text: footer, iconURL: member.user.avatarURL() });
    }
}