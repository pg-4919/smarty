const builders = require("@discordjs/builders");
const discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports = {
    name: "test",
    data: new builders.SlashCommandBuilder()
        .setName("test")
        .setDescription("Basically, tests to see if the commands updated")
        .toJSON(),
    async execute(interaction) {
        await interaction.deferReply();
        const logs = await utils.data.updateRepo();
        await interaction.editReply(logs);
    }
}
