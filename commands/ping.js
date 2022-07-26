const builders = require("@discordjs/builders");
const discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports = {
    name: "ping",
    data: new builders.SlashCommandBuilder()
        .setName("ping")
        .setDescription("Check how laggy the bot is")
        .toJSON(),
    async execute(interaction) {
        const embed = new discord.MessageEmbed()
            .setColor("#636363")
            .setTimestamp()
            .setDescription(`The bot is up and latency is ${Date.now() - interaction.createdTimestamp} ms.`)
            .setFooter({ text: "pinged the bot", iconURL: interaction.member.user.avatarURL() });
        interaction.reply({ embeds: [embed]});
    }
}