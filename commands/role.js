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
        const { guild, channel, member, user, options } = interaction;
        const embed = new discord.EmbedBuilder()
            .setColor("#2F3136")
            .setTimestamp()
            .setFooter({ text: "​", iconURL: member.displayAvatarURL() });

        const color = options.getString("color");
        const name = options.getString("name");

        const customRole = member.roles.cache.find(role => role.color !== 0) ||
            (await guild.roles.create({
                name: member.displayName,
                position: guild.roles.cache.get("813138438013452348").position + 1
            })).setColor("FFFFFF");
        member.roles.add(customRole);

        embed.setDescription(`<@&${customRole.id}> updated.`);
        
        if (color) {
            if (!/^[0-9A-F]{6}$/i.test(color)) embed.setDescription(`Not a valid hex code.`)
            else { const hex = (color.replace("#", "") === "000000") ? "000001" : color.replace("#", ""); }
            customRole.setColor(hex);
        }

        if (name) {
            if (name.length > 100) embed.setDescription(`Name must be 100 characters or fewer.`)
            else await customRole.setName(name);
        }

        interaction.reply({ embeds: [embed], ephemeral: true });

        return;
    }
}