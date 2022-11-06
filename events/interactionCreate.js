const utils = require("../utils/utils.js");

module.exports = async (interaction) => {
    const { client, commandName, customId, isCommand, isModalSubmit, channel } = interaction;
    if (channel.id === client.config.channels.news) return;
    if (isCommand()) client.commands.get(commandName).respond(interaction).catch(err => console.log);
    if (isModalSubmit()) client.commands.get(customId.split("_")[0]).modal(interaction);
}