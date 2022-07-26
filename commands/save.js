const builders = require("@discordjs/builders");
const discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports = {
    name: "save",
    data: new builders.SlashCommandBuilder()
        .setName("save")
        .setDescription("Save and commit bot data to the repository")
        .toJSON(),
    async execute(interaction) {
        await interaction.deferReply();
        const embed = new discord.MessageEmbed()
            .setColor("#636363")
            .setTimestamp()
            .setDescription(`\`\`\`${await utils.data.updateRepo()}\`\`\``)
            .setFooter({ text: "saved the bot", iconURL: interaction.member.user.avatarURL() });
        await interaction.editReply({ embeds: [embed] });
    }
}