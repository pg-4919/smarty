const discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("revoke")
        .setDescription("Revoke all invites (Peter only)")
        .toJSON(),

    async respond(interaction) {
        const { guild, member, user, options } = interaction;
        
        const invites = guild.invites.fetch();

        if (user.username !== "pg_4919") return;

        invites.each(invite => invite.delete);

        const embed = new discord.EmbedBuilder()
            .setColor("#2F3136")
            .setTimestamp()
            .setDescription(`Revoked all invites`)
            .setFooter({ text: "​", iconURL: member.displayAvatarURL() });
        
        return interaction.reply({ embeds: [embed]});
    }
}