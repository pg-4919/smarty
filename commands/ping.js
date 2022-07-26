const builders = require("@discordjs/builders");
const discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports = {
    name: "ping",
    data: new builders.SlashCommandBuilder()
        .setName("ping")
        .setDescription("Check how laggy the bot is")
        .toJSON(),
    async execute(interaction) {
        const embed = utils.embed.default(
            `🏓 Pong! Latency is ${Date.now() - interaction.createdTimestamp} ms.`,
            interaction.member,
            "pinged the bot"
        );
        interaction.reply({ embeds: [embed]});
    }
}