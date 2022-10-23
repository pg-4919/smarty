const discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("archive")
        .setDescription("Stop. Get some help.")
        .toJSON(),
    async respond(interaction) {
        const { guild, channel, member, user, options } = interaction;
        const categories = guild.channels.cache.filter(channel => channel.type === "category");
        const cloned = channel.clone();
        channel.setParent(utils.search(categories, "archives"));
        interaction.reply({ content: "please stop", ephemeral: true });
    }
}