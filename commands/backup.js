const builders = require("@discordjs/builders");
const discord = require("discord.js");

module.exports = {
    name: "backup",
    data: new builders.SlashCommandBuilder()
        .setName("backup")
        .setDescription("This is useless and not implemented right now.")
        .toJSON(),
    async execute(interaction) {
        const embed = new require("../utils/embed.js").default(
            `HAHA DOO DOO CACA`,
            interaction.member,
            "used A USELESS COMMAND LLLLLLLLMAO"
        );
        interaction.reply({ embeds: [embed]});
    }
}