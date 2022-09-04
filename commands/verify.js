const discord = require("discord.js");
const crypto = require("crypto");
const utils = require("../utils/utils.js");

const global = []

module.exports = {
    name: "verify",
    data: new discord.SlashCommandBuilder()
        .setName("verify")
        .setDescription("Verify yourself and get the Human role")
        .toJSON(),
    async respond(interaction) {
        const modal = new discord.ModalBuilder()
            .setCustomId("verify")
            .setTitle("Verify yourself");

        const captcha = new discord.TextInputBuilder()
			.setCustomId("captcha")
			.setLabel(`Enter the following text: ${crypto.randomBytes(3).toString("hex")}`)
			.setStyle(discord.TextInputStyle.Short);

        modal.addComponents(new discord.ActionRowBuilder().addComponents(captcha));

		// Show the modal to the user

        global.push("WEFWEF")
		await interaction.showModal(modal);
    },
    async modal(modal) {
        console.log(global);
        modal.reply("poop")
    }
}
