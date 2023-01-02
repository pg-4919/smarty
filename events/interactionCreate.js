const utils = require("../utils/utils.js");

module.exports = async (interaction) => {
    const { client, guild, commandName, customId, channel, user, createdAt } = interaction;
    const { news, verify } = client.config.channels;

    if (interaction.isCommand() && ((channel.id !== news))) {
        client.logs.unshift(`<@${user.id}> used ${commandName} at \`${utils.timestamp(createdAt)}\``);
        client.logs.length = 10;
        console.log(commandName)
        client.commands.get(commandName).respond(interaction).then(utils.share.await).catch(console.log);
    }

    if (interaction.isModalSubmit()) 
        client.commands.get(customId.split("_")[0]).modal(interaction).catch(console.log);
}