const utils = require("../utils/utils.js");

module.exports = async (interaction) => {
    const { client, commandName, customId, channel } = interaction;
    if (channel.id === client.config.channels.news) return;
    if (interaction.isCommand()) client.commands.get(commandName).respond(interaction).catch(console.log);
    if (interaction.isModalSubmit()) client.commands.get(customId.split("_")[0]).modal(interaction).catch(console.log);
}