const discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("choose")
        .setDescription("Cure your indecisiveness")
        .addStringOption(option => option
            .setName("choices")
            .setDescription("A comma-seperated list of choices to choose from")
            .setRequired(true)
        )
        .toJSON(),

    async respond(interaction) {
        const { member, options } = interaction;
        const embed = utils.templates.embed(member);
        
        const choices = options.getString("choices").split(",");
        const choice = choices[utils.random(0, choices.length - 1)].trim();
        
        embed.setDescription(`I choose \`${choice}\`.`);

        await interaction.deferReply({ ephemeral: true });
        await utils.sleep(1000);
        await interaction.editReply({ embeds: [embed], ephemeral: true, components: [utils.share.button()] });

        return interaction;
    }
}