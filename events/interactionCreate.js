const utils = require("../utils/utils.js");

module.exports = async (interaction) => {
    const { client, commandName, customId, channel, user, createdAt } = interaction;
    const { news, verify } = client.config.channels;
    if (channel.id === news || (channel.id === verify && commandName !== "verify")) return;

    if (interaction.isCommand()) {
        client.logs.unshift(`<@${user.id}> used ${commandName} at \`${createdAt.toTimeString()}\``);
        client.logs.length = 10;
        client.commands.get(commandName).respond(interaction).then(utils.share.await).catch(console.log);
    }

    if (interaction.isModalSubmit()) 
        client.commands
            .get(customId.split("_")[0])
            .modal(interaction)
            .catch(console.log);
}