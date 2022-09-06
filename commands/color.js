const discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports = {
    name: "color",
    data: new discord.SlashCommandBuilder()
        .setName("color")
        .setDescription("Change the color of your name")
        .addStringOption(option => option
            .setName("hex")
            .setDescription("The hex code of the color")
            .setRequired(true)
        )
        .toJSON(),
    async respond(interaction) {
        const hex = (interaction.options.getString("hex").replace("#", "") === "000000") ?
            "000001" : interaction.options.getString("hex").replace("#", ""); //black hex replacement
        const embed = new discord.EmbedBuilder();
        const member = interaction.member;
        const guild = interaction.guild;

        if (!/^[0-9A-F]{6}$/i.test(hex)) { //check if hex code is valid
            embed
                .setColor("#FF0000")
                .setTimestamp()
                .setDescription(`Not a valid hex code.`)
                .setFooter({ text: "did a whoopsie", iconURL: member.user.avatarURL() });
        } else {
            //find custom role & create role if none
            const customRole = member.roles.cache.filter(role => role.color !== 0).first() ||
                await guild.roles.create({
                    name: member.displayName,
                    position: guild.roles.cache.find(
                        role => role.name === "Bots" && role.color === 0
                    ).position + 1
                });
            
            member.roles.add(customRole);
            customRole.setColor(hex);

            embed
                .setColor("#636363")
                .setTimestamp()
                .setDescription(`You changed <@&${customRole.id}>'s color to #${hex}.`)
                .setFooter({ text: "changed their color", iconURL: member.user.avatarURL() });
        }

        return interaction.reply({ embeds: [embed], ephemeral: true });
    }
}