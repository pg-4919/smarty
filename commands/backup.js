const builders = require("@discordjs/builders");
const discord = require("discord.js");
const config = require("../assets/config.json");
const utils = require("../utils/utils.js");

module.exports = {
    name: "backup",
    data: new builders.SlashCommandBuilder()
        .setName("backup")
        .setDescription("This is useless and not implemented right now.")
        .toJSON(),
    async execute(interaction) {
        const embed = new discord.MessageEmbed()
            .setColor("#636363")
            .setTimestamp()
            .setDescription(`Not yet implemented.`)
            .setFooter({ text: "backed up the server", iconURL: interaction.member.user.avatarURL() });
        interaction.reply({ embeds: [embed]});

        const backup = interaction.client.guilds.cache.get(config.servers.backup);
        const main = interaction.client.guilds.cache.get(config.servers.main);
        const random = main.channels.cache.first();
        const messages = await random.messages.fetch({ limit: 100 });
        messages.each(message => console.log(message.content));
    }
}