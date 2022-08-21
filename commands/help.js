const discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports = {
    name: "help",
    data: new discord.SlashCommandBuilder()
        .setName("help")
        .setDescription("Stop. Get some help.")
        .toJSON(),
    async execute(interaction) {
        const embed = new discord.MessageEmbed()
            .setColor("#636363")
            .setTitle("Commands")
            .addFields(
                { name: "/help", value: "R e c e i v e   h e l p." },
                { name: "/changes", value: "See the most recent changes." },
                { name: "/save", value: "Saves statistics and other data." },
                { name: "/stats", value: "Check the given statistic of a given user. If no user is specified, defaults to the executor." },
                { name: "/ping", value: "See the latency of the bot in milliseconds." },
            )
            .setTimestamp()
            .setFooter({ text: "checked the changelog", iconURL: interaction.member.user.avatarURL() });
        interaction.reply({ embeds: [embed]});
    }
}