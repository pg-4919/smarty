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
        const embed = utils.embed.default(
            `Alright man backing up the thing`,
            interaction.member,
            "backed up the server"
        );
        interaction.reply({ embeds: [embed]});

        const backup = interaction.client.guilds.cache.get(config.servers.backup);
        const main = interaction.client.guilds.cache.get(config.servers.main);
        const random = main.channels.cache.first();
        const messages = await random.messages.fetch({ limit: 100 });
        messages.each(message => console.log(message.content));
    }
}