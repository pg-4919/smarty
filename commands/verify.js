const discord = require("discord.js");
const crypto = require("crypto");
const utils = require("../utils/utils.js");

const captchas = new discord.Collection();

/*
Notes:

The verify command uses modals, and thus establishes conventions for
doing so. A seperate function should be used to respond to all modals.
Modals should be treated as discord.Interactions.
*/

module.exports = {
    nci: true,

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
            .setRequired(true);

        captchas.set(interaction.user.id, string);
        modal.addComponents(new discord.ActionRowBuilder().addComponents(captcha));

        return interaction.showModal(modal);
    },

    async modal(modal) {
        const { member, fields, guild, client } = modal;
        const string = fields.getTextInputValue("captcha").toLowerCase();
        const humans = await guild.roles.fetch(client.config.roles.humans);

        if (string === captchas.get(modal.user.id)) {
            const embed = utils.templates.embed(member).setDescription(`You were successfully verified.`);
            member.roles.add(humans);
            modal.reply({ embeds: [embed], ephemeral: true });
        }

        return captchas.delete(modal.user.id);
    }
}