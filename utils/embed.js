const discord = require("discord.js");

module.exports = {
    default(member, description, footer) {
        return new discord.MessageEmbed()
            .setColor("ff0000")
            .setDescription(description)
            .setTimestamp()
            .setFooter({ text: footer, iconURL: member.user.avatarURL() })
    }
}