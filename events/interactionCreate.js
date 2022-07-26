const utils = require("../utils/utils.js");

module.exports = async (interaction) => {
    if (interaction.channel.name === "news") return;
    if (interaction.isCommand()) {
        utils.stats.increment(interaction.guild, interaction.user, "cmds_sent", 1);
        interaction.client.commands.get(interaction.commandName).execute(interaction);
    }
}