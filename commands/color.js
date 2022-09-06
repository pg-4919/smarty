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

        if (!/^[0-9A-F]{6}$/i.test(hex) || ["000000", "#000000"].includes(hex)) {
            embed.setColor("#FF0000")
                .setTimestamp()
                .setDescription(`Not a valid hex code. (You can't set your color to black because of Discord's design.)`)
                .setFooter({ text: "did a stupid", iconURL: member.user.avatarURL() });
        } else {
            const customRole = member.roles.cache.filter(role => role.color !== 0).first() || 
                await guild.roles.create({
                    name: member.displayName,
                    color: hex,
                    position: guild.roles.cache.find(role => role.name === "Bots" && role.color === 0).position + 1
                });
            
            member.roles.add(customRole); //catch new roles

            embed.setColor("#636363")
                .setTimestamp()
                .setDescription(`You changed <@&${customRole.id}>'s color to ${hex}`)
                .setFooter({ text: "changed their color", iconURL: interaction.member.user.avatarURL() });
        }
        return interaction.reply({ embeds: [embed], ephemeral: true });
    }
}