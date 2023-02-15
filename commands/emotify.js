const discord = require("discord.js");
const utils = require("../utils/utils.js")

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("fun")
        .setDescription("Do crazy stuff to your message")
        .addStringOption(option => option
            .setName("type")
            .setDescription("Which converter to use")
            .setRequired(true)
            .addChoices(
                { name: "block", value: "block" },
                { name: "zalgo", value: "zalgo" }
            ))
        .addStringOption(option => option
            .setName("message")
            .setDescription("Your message")
            .setRequired(true)
        )
        .toJSON(),

    async respond(interaction) {
        const { member, client, options } = interaction;

        const message = options.getString("message")
            .replace(/[\W_]+/g, " ")
            .split("")
            .map(str => str === " " ? "   " : `:regional_indicator_${str.toLowerCase()}:`)
            .join(" ");

        interaction.reply(message);

        return interaction;
    }
}