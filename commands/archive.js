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
        //const cloned = await channel.clone();

        await channel.setName(`${channel.name}-archive-1`);
        const previous = utils.search.byName(archives.children.cache, channel.name);
        
        if (previous) {
            const catalog = `${channel.name}-archive-${parseInt(previous.name.split("-")[-1]) + 1}`;
            console.log(catalog);
            await channel.setName(catalog);
        }

        
        console.log(archives);
        channel.setParent(archives);
        
        interaction.reply({ content: "please stop", ephemeral: true });
    }
}