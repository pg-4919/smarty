const builders = require("@discordjs/builders");
const discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports = {
    name: "changes",
    data: new builders.SlashCommandBuilder()
        .setName("changes")
        .setDescription("See the latest changes to Smarty.")
        .toJSON(),
    async execute(interaction) {
        const embed = new discord.MessageEmbed()
            .setColor("#636363")
            .setTitle("Changelog")
            .setDescription("You are currently on version 1.1.0 of Smarty Infdev.")
            .addFields(
                { name: "Help command", value: "YOU CAN FINALLY GET **HELP!!!!????!**#@!**" },
                { name: "Github data storage", value: "Smarty now uses Github to store data. Try it with /save." },
                { name: "Changelog command", value: "Well you clearly figured this one out" },
                { name: "More efficient utils system", value: "Implemented several new utils, such as data, root, stats, and a wrapper util. Also removed embed util." },
            )
            .setTimestamp()
            .setFooter({ text: "checked the changelog", iconURL: interaction.member.user.avatarURL() });
        interaction.reply({ embeds: [embed]});
    }
}