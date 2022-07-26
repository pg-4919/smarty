const discord = require("discord.js");

module.exports = {
    default(description, member, footer) {
        return new discord.MessageEmbed()
            .setColor("#636363")
            .setDescription(description)
            .setTimestamp()
            .setFooter({ text: footer, iconURL: member.user.avatarURL() });
    }
}