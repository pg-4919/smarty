const builders = require("@discordjs/builders");
const discord = require("discord.js");

module.exports = {
    name: "ping",
    data: new builders.SlashCommandBuilder()
        .setName("ping")
        .setDescription("See if Smarty is online and how laggy it is")
        .toJSON(),
    async execute(interaction) {
        const embed = new require("../utils/embed.js").default(
            `🏓 Pong! Latency is ${Date.now() - interaction.createdTimestamp} ms.`,
            interaction.member,
            "used /ping"
        );
        interaction.reply({ embeds: [embed]});
        return setTimeout(() => interaction.deleteReply(), 60 * 1000);
    }
}