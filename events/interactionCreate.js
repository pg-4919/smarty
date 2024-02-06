const utils = require("../utils/utils.js");

module.exports = async (interaction) => {
    const { client, commandName, channel } = interaction;
    const { news } = client.config.channels;

    if (interaction.isCommand() && ((channel.id !== news)))
        client.commands.get(commandName).respond(interaction).then(utils.share.await).catch(console.log);
}