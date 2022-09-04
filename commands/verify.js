const discord = require("discord.js");
const crypto = require("crypto");
const utils = require("../utils/utils.js");

const captchas = new discord.Collection();

module.exports = {
    name: "verify",
    data: new discord.SlashCommandBuilder()
        .setName("verify")
        .setDescription("Verify yourself and get the Human role")
        .toJSON(),
    async respond(interaction) {
        const string = crypto.randomBytes(3).toString("hex");
        const modal = new discord.ModalBuilder()
            .setCustomId("verify")
            .setTitle("Verify yourself");
        const captcha = new discord.TextInputBuilder()
			.setCustomId("captcha")
			.setLabel(`Enter the following text: ${string}`)
			.setStyle(discord.TextInputStyle.Short)
            .setMinLength(6)
            .setRequired(true)

        captchas.set(interaction.user.id, string);
        modal.addComponents(new discord.ActionRowBuilder().addComponents(captcha));
		return interaction.showModal(modal);
    },
    async modal(modal) {
        const string = modal.fields.getTextInputValue("captcha").toLowerCase();
        const humans = modal.guild.roles.cache.filter(role => role.name === "Humans");
        if (string === captchas.get(modal.user.id)) {
            modal.member.roles.add(humans);
            const embed = new discord.EmbedBuilder()
                .setColor("#636363")
                .setTimestamp()
                .setDescription(`You were successfully verified.`)
                .setFooter({ text: "verified themselves", iconURL: interaction.member.user.avatarURL() });
            modal.reply({ embeds: [embed] });
        }
        captchas.delete(modal.user.id);
        return;
    }
}
