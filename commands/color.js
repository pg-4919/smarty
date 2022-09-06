const discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports = {
    name: "color",
    data: new discord.SlashCommandBuilder()
        .setName("color")
        .setDescription("Change the color of your name")
        .addStringOption(option => option.setName("hex").setDescription("The hex code of the color").setRequired(true))
        .toJSON(),
    async respond(interaction) {
        const hex = interaction.options.getString("hex").replace("#", "");
        const embed = new discord.EmbedBuilder();
        const member = interaction.member;
        const guild = interaction.guild;

        if (!/^[0-9A-F]{6}$/i.test(hex)) {
            embed.setColor("#FF0000")
                .setTimestamp()
                .setDescription(`Not a valid hex code.`)
                .setFooter({ text: "did a stupid", iconURL: member.user.avatarURL() });
        } else {
            const customRole = member.roles.cache.filter(role => role.color !== 0 && role.name !== "@everyone").first();
            if (typeof customRole === undefined) {
                const newRole = await guild.roles.create({
                    name: member.displayName,
                    color: hex,
                    position: guild.roles.cache.find(role => role.name === "Bots" && role.color === 0).position + 1
                });
                return interaction.reply(JSON.stringify(newRole));
            }
            console.log(customRole)
            embed.setColor("#636363")
                .setTimestamp()
                .setDescription(`#${JSON.stringify(customRole)}.`)
                .setFooter({ text: "changed their color", iconURL: interaction.member.user.avatarURL() });
        }
        return interaction.reply({ embeds: [embed], ephemeral: true });
    }
}