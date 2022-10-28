const discord = require("discord.js");
const captcha = require("discord.js-captcha");
const utils = require("../utils/utils.js");

const users = new discord.Collection();

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("test")
        .setDescription("Check how laggy the bot is")
        .toJSON(),

    async respond(interaction) {
        const myCaptcha = await captcha.createCaptcha(4, "0123456789");

        const row = new discord.ActionRowBuilder()
            .addComponents(
                new discord.ButtonBuilder()
                    .setCustomId('primary')
                    .setLabel('Verify')
                    .setStyle(discord.ButtonStyle.Primary),
            );

        users.set(interaction.user.id, myCaptcha.text);

        return interaction.reply({
            content: myCaptcha.text,
            files: [{ attachment: myCaptcha.image }],
            ephemeral: true
        });
    }
}