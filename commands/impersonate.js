const discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports = {
    name: "impersonate",
    data: new discord.SlashCommandBuilder()
        .setName("impersonate")
        .setDescription("Impersonate another user")
        .addSubcommand(subcommand => subcommand
            .setName("start")
            .setDescription("Start impersonating someone")
            .addUserOption(option => option
                .setName("person")
                .setDescription("The person to impersonate")
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName("stop")
            .setDescription("Stop impersonating someone")
        )
        .toJSON(),
    async execute(interaction) {
        switch (interaction.options.getSubcommand()) {
            case "start":
                interaction.reply({content: "ok", ephemeral: true});
                break;

            case "stop":
                interaction.reply({content: "alright", ephemeral: true});
                break;
        }
    }
}