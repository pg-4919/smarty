const discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("admin")
        .setDescription("Make someone an admin")
        .addUserOption(option => option
            .setName("target")
            .setDescription("Who to elevate")
            .setRequired(false)
        )
        .toJSON(),

    async respond(interaction) {
        const { member, user, options, client } = interaction;
        const embed = utils.templates.embed(member);

        const target = options.getMember("target") || member;
        const roles = target.roles;
        const overrides = client.config.roles.overrides;

        if (!client.config.admins.includes(user.id))
            embed.setDescription(`You don't have permission to use this command.`);
        else {
            roles.cache.has(overrides) ? roles.remove(overrides) : roles.add(overrides);
            embed.setDescription(`Changed the status of <@${target.id}>`);
        }

        await interaction.reply({ embeds: [embed], ephemeral: true });

        return;
    },
}