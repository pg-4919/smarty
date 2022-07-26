const builders = require("@discordjs/builders");
const discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports = {
    name: "stats",
    data: new builders.SlashCommandBuilder()
        .setName("stats")
        .setDescription("View your statistics in this server")
        .addStringOption(option => {
            option.setName("statistic")
                .setDescription("Which statistic to view")
                .setRequired(true)
                .addChoices(
                    { name: "messages_sent", value: "stats_messages_sent" },
                    { name: "commands_sent", value: "stats_commands_sent" },
                )
        })
        .toJSON(),
    async execute(interaction) {
        await interaction.deferReply();
        const embed = new discord.MessageEmbed()
            .setColor("#636363")
            .setTimestamp()
            .setDescription(`${JSON.stringify(interaction)}`)
            .setFooter({ text: "saved the bot", iconURL: interaction.member.user.avatarURL() });
        await interaction.editReply({ embeds: [embed] });
    }
}