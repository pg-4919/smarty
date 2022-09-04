const discord = require("discord.js");
const utils = require("../utils/utils.js");

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

        const captcha = new TextInputBuilder()
			.setCustomId("captcha")
			.setLabel("Enter the following text: ")
			.setStyle(TextInputStyle.Short);
    },
    async modal(modal) {
        console.log(modal);
        modal.reply("poop")
    }
}
