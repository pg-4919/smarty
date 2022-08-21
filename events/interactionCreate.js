const utils = require("../utils/utils.js");

module.exports = async (interaction) => {
    if (interaction.channel.name === "news") return;
    if (interaction.isCommand()) {
        interaction.client.commands.get(interaction.commandName).execute(interaction);
    }
}