const builders = require("@discordjs/builders");
const discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports = {
    name: "stats",
    data: new builders.SlashCommandBuilder()
        .setName("stats")
        .setDescription("View your statistics in this server")
        .addStringOption(option => 
            option.setName('category')
                .setDescription('The gif category')
                .setRequired(true)
                .addChoices(
                    { name: 'Funny', value: 'gif_funny' },
                    { name: 'Meme', value: 'gif_meme' },
                    { name: 'Movie', value: 'gif_movie' },
                )
        )
        .toJSON(),
    async execute(interaction) {
        await interaction.deferReply();
        const embed = new discord.MessageEmbed()
            .setColor("#636363")
            .setTimestamp()
            .setDescription(`${JSON.stringify(interaction)}`)
            .setFooter({ text: "saved the bot", iconURL: interaction.member.user.avatarURL() });
        await interaction.editReply({ embeds: [embed] });
    }
}