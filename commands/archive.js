const discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("archive")
        .setDescription("Stop. Get some help.")
        .toJSON(),

    async respond(interaction) {
        const { guild, channel, member, user, options } = interaction;
        const categories = guild.channels.cache.filter(channel => channel.type === 4);
        const archives = utils.search.byName(categories, "archives");
        const cloned = channel.clone();

        const previous = utils.search.byName(archives.channels.cache, channel.name);
        if (previous) channel.setName(`${channel.name}-archive-${previous.name.split("-")[-1]}`);
        else channel.setName(`${channel.name}-archive-1`);

        console.log(archives);
        channel.setParent(archives);
        interaction.reply({ content: "please stop", ephemeral: true });
    }
}