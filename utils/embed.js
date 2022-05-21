const discord = require("discord.js");

module.exports = {
    default(description, member, footer) {
        return new discord.MessageEmbed()
            .setColor("ff0000")
            .setDescription(description)
            .setTimestamp()
            .setFooter({ text: footer, iconURL: member.user.avatarURL() });
    }
}