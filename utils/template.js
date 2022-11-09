module.exports = {
    embed: new discord.EmbedBuilder()
        .setColor("#2F3136")
        .setTimestamp()
        .setFooter({ text: "​", iconURL: member.displayAvatarURL() })
}