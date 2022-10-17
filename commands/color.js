const discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports = { 
    data: new discord.SlashCommandBuilder()
        .setName("role")
        .setDescription("Change your role's name and color")
        .addStringOption(option => option
            .setName("hex")
            .setDescription("The hex code of the color")
            .setRequired(false)
        )
        .addStringOption(option => option
            .setName("name")
            .setDescription("What to change your role's name to")
            .setRequired(false)
        )
        .toJSON(),

    async respond(interaction) {
        const hex = interaction.options.getString("hex"); //black hex replacement
        const name = interaction.options.getString("name");
        const embed = new discord.EmbedBuilder().setTimestamp().setColor("#FF0000");
        const member = interaction.member;
        const guild = interaction.guild;

        if (!/^[0-9A-F]{6}$/i.test(hex)) { //check if hex code is valid
            embed.setColor("#FF0000")
                .setTimestamp()
                .setDescription(`Not a valid hex code.`)
                .setFooter({ text: "did a whoopsie", iconURL: member.user.avatarURL() });

        } else {
            //find custom role & create role if none
            const customRole = member.roles.cache.find(role => role.color !== 0) ||
                    await guild.roles.create({
                        name: member.displayName,
                        position: guild.roles.cache.find(
                            role => role.name === "Bots" && role.color === 0
                        ).position + 1
                    });

            console.log(name);

            if (hex) {
                hex = (hex.replace("#", "") === "000000") ? "000001" : interaction.options.getString("hex").replace("#", "")
                member.roles.add(customRole);
                customRole.setColor(hex);
            }

            if (name) {
                
                member.roles.add(customRole);
                customRole.setName(name);
            }

            embed.setColor("#2F3136")
                .setTimestamp()
                .setDescription(`You changed <@&${customRole.id}>'s color to #${hex}.`)
                .setFooter({ text: "changed their color", iconURL: member.user.avatarURL() });
        }

        return interaction.reply({ embeds: [embed], ephemeral: true });
    }
}