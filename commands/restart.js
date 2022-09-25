const discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("restart")
        .setDescription("Stop. Get some help.")
        .toJSON(),
        
    async respond(interaction) {
        const embed = new discord.EmbedBuilder()
            .setColor("#2F3136")
            .setTimestamp()
            .setDescription(`Restarting ... may take a while.`)
            .setFooter({ text: "restarted the bot", iconURL: interaction.member.user.avatarURL() });

        await interaction.reply({ embeds: [embed], ephemeral: true });

        return setTimeout(() => {
            process.on("exit", () => {
                require("child_process").exec(`cd ${utils.root} && npm start`)
            });
            process.exit();
        }, 5000);
    }
}

