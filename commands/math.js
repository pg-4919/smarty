const discord = require("discord.js");
const captcha = require("discord.js-captcha");
const utils = require("../utils/utils.js");

const users = new discord.Collection();

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("math")
        .setDescription("Evaluate a math expression")
        .addStringOption(option => option
            .setName("expression")
            .setDescription("The expression to evaluate")
            .setRequired(true)
        )
        .toJSON(),

    async respond(interaction) {
        const myCaptcha = await captcha.createCaptcha(4, "0123456789");
        
        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('primary')
					.setLabel('Click me!')
					.setStyle(ButtonStyle.Primary),
			);
            
            
        return interaction.reply({ content: myCaptcha.text, files: [ {attachment: myCaptcha.image} ]});
    }
}