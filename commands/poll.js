const discord = require("discord.js");
const utils = require("../utils/utils.js");
const fs = require("fs");

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("poll")
        .setDescription("Create a poll (max 10 choices)")
        .addStringOption(option => option.setName("choice1")
            .setDescription("The first choice in the poll")
            .setRequired(true)
        )
        .addStringOption(option => option.setName("choice2")
            .setDescription("Another choice in the poll")
            .setRequired(true)
        )
        .addStringOption(option => option.setName("choice3").setDescription("Yet another choice in the poll"))
        .addStringOption(option => option.setName("choice4").setDescription("Here's another one"))
        .addStringOption(option => option.setName("choice5").setDescription("And another"))
        .addStringOption(option => option.setName("choice6").setDescription("Jesus Christ how many choices do you have?"))
        .addStringOption(option => option.setName("choice7").setDescription("Great heavens"))
        .addStringOption(option => option.setName("choice8").setDescription("Gods preserve us"))
        .addStringOption(option => option.setName("choice9").setDescription("We near the limit"))
        .addStringOption(option => option.setName("choice10").setDescription("Your reign of terror is at an end"))

        .toJSON(),

    async respond(interaction) {

        const embed = utils.embed(member).setDescription(`no`);

        await interaction.reply({ embeds: [embed], ephemeral: true, components: [utils.share.button()] });

        return interaction;
    }
}