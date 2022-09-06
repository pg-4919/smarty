const utils = require("../utils/utils.js");

module.exports = async (interaction) => {
    if (interaction.channel.name === "news") return;
    if (interaction.isCommand()) interaction.client.commands.get(interaction.commandName).respond(interaction);
    if (interaction.isModalSubmit()) interaction.client.commands.get(interaction.customId.split("_")[0]).modal(interaction);
}