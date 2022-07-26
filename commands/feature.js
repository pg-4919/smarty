const builders = require("@discordjs/builders");
const discord = require("discord.js");

module.exports = {
    name: "feature",
    data: new builders.SlashCommandBuilder()
        .setName("feature")
        .setDescription("This is useless and not implemented right now.")
        .toJSON(),
    async execute(interaction) {
        const embed = utils.embed.default(
            `HAHA DOO DOO CACA`,
            interaction.member,
            "used A USELESS COMMAND LLLLLLLLMAO"
        );
        interaction.reply({ embeds: [embed]});
    }
}