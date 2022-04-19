const builders = require("@discordjs/builders");
const discord = require("discord.js");

module.exports = {
    name: "ping",
    data: new builders.SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!')
        .toJSON(),
    async execute(interaction) {
        const embed = new discord.MessageEmbed()
            .setColor("#8d8d8d")
            .setDescription(`🏓 Pong! Latency is ${Date.now() - interaction.createdTimestamp} ms.`)
            .setTimestamp()
            .setFooter({ text: "used /ping", iconURL: interaction.user.avatarURL() });

        interaction.reply({ embeds: [embed]});
        return setTimeout(() => interaction.deleteReply(), 60 * 1000);
    }
}