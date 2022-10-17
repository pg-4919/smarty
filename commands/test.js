const discord = require("discord.js");
const captcha = require("discord.js-captcha");
const utils = require("../utils/utils.js");

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("test")
        .setDescription("Check how laggy the bot is")
        .toJSON(),

    async respond(interaction) {
        const myCaptcha = await captcha.createCaptcha(4, "0123456789");
        
        const attachment = new discord.AttachmentBuilder(myCaptcha.buffer);
        
        return interaction.reply({ content: myCaptcha.text, files: [ {attachment: myCaptcha.image} ]});
    }
}