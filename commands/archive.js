const discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("archive")
        .setDescription("Stop. Get some help.")
        .toJSON(),

    async respond(interaction) {
        try {
            const { guild, channel, member, user, options } = interaction;
            const categories = guild.channels.cache.filter(channel => channel.type === 4);
            const archives = utils.search.byName(categories, "archives");
            const cloned = await channel.clone();

            /* await channel.setName(`${channel.name}-archive-1`);
            const previous = utils.search.byName(archives.children.cache, channel.name);
            if (previous) await channel.setName(`${channel.name}-archive-${previous.name.split("-")[-1]}`);

            console.log(archives);
            channel.setParent(archives);
            */
            console.log(archives);
            interaction.reply({ content: "please stop", ephemeral: true });
        } catch (err) {
            console.log(err);
        }
    }
}