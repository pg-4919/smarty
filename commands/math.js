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
        const { guild, channel, member, user, options } = interaction;
        const expression = options.getString("expression");

        
            
        return interaction.reply({ content: mexp.eval(expression) });
    }
}