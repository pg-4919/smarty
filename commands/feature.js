const builders = require("@discordjs/builders");
const discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports = {
    name: "feature",
    data: new builders.SlashCommandBuilder()
        .setName("feature")
        .setDescription("This is useless and not implemented right now.")
        .toJSON(),
    async execute(interaction) {
        const embed = new discord.MessageEmbed()
            .setColor("#636363")
            .setTimestamp()
            .setDescription(`Yet to be implemented`)
            .setFooter({ text: "used a useless command", iconURL: interaction.member.user.avatarURL() });
        interaction.reply({ embeds: [embed]});
    }
}