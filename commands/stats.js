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
                    { name: "Messages sent", value: "stats_msgs_sent" },
                    { name: "Commands executed", value: "stats_cmds_sent" }
                )
        )
        .toJSON(),
    async execute(interaction) {
        const statId = interaction.options.getString("statistic").replace("stats_", "");
        const statValue = utils.stats.read(interaction.guild, interaction.user, statId);

        const embed = new discord.MessageEmbed()
            .setColor("#636363")
            .setTimestamp()
            .setDescription(`${statValue}`)
            .setFooter({ text: "checked their stats", iconURL: interaction.member.user.avatarURL() });

        await interaction.reply({ embeds: [embed] });
    }
}