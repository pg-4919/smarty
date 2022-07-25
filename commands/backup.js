const builders = require("@discordjs/builders");
const discord = require("discord.js");
const config = require("../assets/config.json")

module.exports = {
    name: "backup",
    data: new builders.SlashCommandBuilder()
        .setName("backup")
        .setDescription("This is useless and not implemented right now.")
        .toJSON(),
    async execute(interaction) {
        const embed = new require("../utils/embed.js").default(
            `Alright man backing up the thing`,
            interaction.member,
            "backed up the server"
        );
        interaction.reply({ embeds: [embed]});

        const backup = client.guilds.cache.get(config.servers.backup);
        console.log(backup);
    }
}