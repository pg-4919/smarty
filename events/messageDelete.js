const utils = require("../utils/utils.js");

module.exports = async message => {
    const { author, channel, client, guild } = message;
    const { news, chat } = client.config.channels;

    if (client.clones.has(message.id)) {
        const cloned = client.clones.get(message.id);
        const webhooks = await guild.fetchWebhooks();
        const webhook = webhooks.get(cloned.webhookId);
        if (!webhook) return console.log("Something went wrong.");

        await webhook.deleteMessage(cloned.id);
    }
}