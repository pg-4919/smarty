const builders = require("@discordjs/builders");
const discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports = {
    name: "stats",

    data: new builders.SlashCommandBuilder()
        .setName("stats")
        .setDescription("View someone's statistics")
        .addStringOption(option => 
            option.setName("statistic")
                .setDescription("Which statistic to view")
                .setRequired(true)
                .addChoices(
                    { name: "Messages sent", value: "stats_msgs_sent" },
                    { name: "Commands executed", value: "stats_cmds_sent" }
                )
        )
        .addUserOption(option => option.setName("person")
            .setDescription("Whom to check the stats of (defaults to you)")
            .setRequired(false))
        .toJSON(),

    async execute(interaction) {
        const statistic = interaction.options.getString("statistic").replace("stats_", "");
        const person = interaction.options.getMember("person") || interaction.member;
        const value = utils.stats.read(interaction.guild, target.user, statId);
        const template = require(`${utils.path.assets}/statmsgs.json`)[statistic];

        const embed = new discord.MessageEmbed()
            .setColor("#636363")
            .setTimestamp()
            .setDescription(`<@${target.id}> ${template[0]} \`${statValue}\` ${template[1]}`)
            .setFooter({ text: "checked some stats", iconURL: interaction.member.user.avatarURL() });

        await interaction.reply({ embeds: [embed] });
    }
}