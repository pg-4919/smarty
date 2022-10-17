const discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("role")
        .setDescription("Change your role's name and color")
        .addStringOption(option => option
            .setName("color")
            .setDescription("What to change the role's color to")
            .setRequired(false)
        )
        .addStringOption(option => option
            .setName("name")
            .setDescription("What to change the role's name to")
            .setRequired(false)
        )
        .toJSON(),

    async respond(interaction) {
        const color = interaction.options.getString("color");
        const name = interaction.options.getString("name");
        const embed = new discord.EmbedBuilder().setTimestamp().setColor("#FF0000");
        const member = interaction.member;
        const guild = interaction.guild;

        //find custom role & create role if none
        const customRole = member.roles.cache.find(role => role.color !== 0) ||
            await guild.roles.create({
                name: member.displayName,
                position: guild.roles.cache.find(
                    role => role.name === "Bots" && role.color === 0
                ).position + 1
            });
        member.roles.add(customRole);

        embed.setColor("#2F3136")
            .setTimestamp()
            .setDescription(`<@&${customRole.id}> updated.`)
            .setFooter({ text: "changed their color", iconURL: member.user.avatarURL() });
        await customRole.setColor(hex);

        if (color) {
            if (!/^[0-9A-F]{6}$/i.test(color)) { //check if hex code is valid
                embed.setColor("#FF0000")
                    .setTimestamp()
                    .setDescription(`Not a valid hex code.`)
                    .setFooter({ text: "did a whoopsie", iconURL: member.user.avatarURL() });
            } else {
                const hex = (color.replace("#", "") === "000000") ? "000001" : color.replace("#", "");
            }
        }

        if (name) {
            if (name.length > 100) {
                embed.setColor("#FF0000")
                    .setTimestamp()
                    .setDescription(`Name must be 100 characters or fewer.`)
                    .setFooter({ text: "did a whoopsie", iconURL: member.user.avatarURL() });
            } else {
                embed.setColor("#2F3136")
                    .setTimestamp()
                    .setDescription(`<@&${customRole.id}> updated.`)
                    .setFooter({ text: "changed their color", iconURL: member.user.avatarURL() });
                await customRole.setName(name);
            }
        }

        

        return interaction.reply({ embeds: [embed], ephemeral: true });
    }
}