const discord = require("discord.js");

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("avatar")
        .setDescription("Enlarge someone's profile picture")
        .addUserOption(option => option
            .setName("target")
            .setDescription("Whose avatar to display")
            .setRequired(false)
        )
        .toJSON(),

    async respond(interaction) {
        const { member, options } = interaction;
        const embed = utils.embed(member);

        const target = options.getMember("target") || member;
        const avatar = target.displayAvatarURL({ size: 4096 });

        embed.setImage(avatar);

        await interaction.reply({ embeds: [embed], ephemeral: true, components: [utils.share.button()] });

        return interaction;
    }
}