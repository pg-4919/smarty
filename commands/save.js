const builders = require("@discordjs/builders");
const discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports = {
    name: "save",
    data: new builders.SlashCommandBuilder()
        .setName("save")
        .setDescription("Save and commit bot data to the repository")
        .toJSON(),
    async execute(interaction) {
        await interaction.deferReply();
        const embed = new require(utils.embed).default(
            `\`\`\`${await utils.data.updateRepo()}\`\`\`.`,
            interaction.member,
            "saved the bot"
        );
        await interaction.editReply(logs);
    }
}