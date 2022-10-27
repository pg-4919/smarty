const discord = require("discord.js");
const captcha = require("discord.js-captcha");
const utils = require("../utils/utils.js");
const mexp = require("math-expression-evaluator");
const { Message } = require("discord.js");

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
        const embed = new discord.EmbedBuilder()
            .setColor("#2F3136")
            .setTimestamp()
            .setFooter({ text: "​", iconURL: member.displayAvatarURL() });
        
        const expression = options.getString("expression");
        
        try { embed.setDescription(`\`${utils.truncate(expression, 30)}\` = \`${mexp.eval(expression)}\``) }
        catch (err) { embed.setDescription(`Error: \`${err.message}\``) };
        
        await interaction.deferReply();
        await interaction.editReply({ embeds: [embed], ephemeral: true });

        return;
    }
}