const discord = require("discord.js");
const captcha = require("discord.js-captcha");
const utils = require("../utils/utils.js");

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("ping")
        .setDescription("Check how laggy the bot is")
        .toJSON(),

    async respond(interaction) {
        const myCaptcha = await captcha.createCaptcha(4, "0123456789");
        
        const embed = new discord.EmbedBuilder()
            .setColor("#2F3136")
            .setTimestamp()
            .setDescription(`The bot is up and latency is ${Date.now() - interaction.createdTimestamp} ms.`)
            .setFooter({ text: "pinged the bot", iconURL: interaction.member.user.avatarURL() });

        const attachment = new discord.MessageAttachment(myCaptcha.buffer, "thing.png");
        
        return interaction.reply({ content: myCaptcha.text, attachments: [attachment ]});
    }
}