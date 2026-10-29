const chproc = require("child_process");
const discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("reboot")
        .setDescription("Reboot Smarty")
        .toJSON(),

    async respond(interaction) {
        const { member, user, client } = interaction;
        const embed = utils.embed(member);
        const perms = client.config.admins.includes(user.id);

        if (!perms) embed.setDescription(`You don't have permission to use this command.`);
        else embed.setDescription(`Smarty will reboot in 5 seconds.`);
        await interaction.reply({ embeds: [embed], ephemeral: true });
        
        if (perms) setTimeout(() => chproc.exec("pkill -f -SIGHUP nodemon"), 5000);

        return interaction;
    },
}