const utils = require("../utils/utils.js");

module.exports = async (filler, message) => {
    const { author, channel, client, guild } = message;
    const { news, chat } = client.config.channels;

    if (client.clones.has(message.id)) {
        const cloned = client.clones.get(message.id);

        const webhooks = await guild.fetchWebhooks();
        const webhook = webhooks.get(cloned.webhookId);
        if (!webhook) return;

        await webhook.deleteMessage(cloned.id);
    }
}