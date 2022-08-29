const discord = require("discord.js");
const utils = require("../utils/utils.js");
const fs = require("fs");

//TODO: implement a global temp storage system

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
        const user = interaction.user;

        const impersonators = require(`${utils.path.temp}/impersonate.json`);

        switch (interaction.options.getSubcommand()) {
            case "start":
                impersonators[user.id] = interaction.options.getUser("person").id;
                fs.writeFileSync(`${utils.path.temp}/impersonate.json`, JSON.stringify(impersonators));
                await interaction.reply({content: impersonators[user.id], ephemeral: true});
                break;

            case "stop":
                delete impersonators[user.id];
                fs.writeFileSync(`${utils.path.temp}/impersonate.json`, JSON.stringify(impersonators));
                await interaction.reply({content: "alright", ephemeral: true});
                break;
        }
    }
}