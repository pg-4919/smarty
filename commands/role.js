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
        const { guild, member, options } = interaction;
        const embed = new utils.templates.embed(member);
        const { setDescription } = embed;

        const color = options.getString("color").replace("#", "");
        const name = options.getString("name");

        const custom = member.roles.cache.find(role => role.color !== 0) ||
            (await guild.roles.create({
                name: member.displayName,
                position: guild.roles.fetch(client.config.roles.bots).position + 1
            })).setColor("FFFFFF");
        member.roles.add(custom);
        
        if (color) {
            if (!/^[0-9A-F]{6}$/i.test(color)) setDescription(`Not a valid hex code.`)
            else { const hex = (color === "000000") ? "000001" : color; }
            custom.setColor(hex);
        }
        
        if (name) {
            if (name.length > 100) setDescription(`Name must be 100 characters or fewer.`)
            else await custom.setName(name);
        }

        setDescription((color || name) ?
            `<@&${customRole.id}> updated.` : 
            `<@&${customRole.id}> has the name ${custom.name} and the color \`${custom.hexColor}\`.`
        );

        interaction.reply({ embeds: [embed], ephemeral: true });

        return;
    }
}