const discord = require("discord.js");
const utils = require("../utils/utils.js");
const mexp = require("math-expression-evaluator");

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
        const { member, options } = interaction;
        const embed = utils.embed(member);
        
        const expression = options.getString("expression");
        
        try { embed.setDescription(`\`${utils.truncate(expression, 30)}\` = \`${mexp.eval(expression)}\``) }
        catch (err) { embed.setDescription(`Error: \`${err.message}\``) }
        
        await interaction.deferReply({ ephemeral: true });
        await interaction.editReply({ embeds: [embed], ephemeral: true, components: [utils.share.button()] });

        return interaction;
    }
}