const builders = require("@discordjs/builders");
const discord = require("discord.js");

module.exports = {
    name: "test",
    data: new builders.SlashCommandBuilder()
        .setName("test")
        .setDescription("Basically, tests to see if the commands updated")
        .toJSON(),
    async execute(interaction) {
        interaction.reply("The test succeeded. Id: 1");
    }
}
