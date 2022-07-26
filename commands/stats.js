const builders = require("@discordjs/builders");
const discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports = {
    name: "stats",
    data: new builders.SlashCommandBuilder()
        .setName("stats")
        .setDescription("View your statistics in this server")
        .addStringOption(option => 
            option.setName("statistic")
                .setDescription("Which stat to view")
                .setRequired(true)
                .addChoices(
                    { name: "Messages sent", value: "stats_msg_sent" },
                    { name: "Commands executed", value: "stats_cmds_sent" }
                )
        )
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