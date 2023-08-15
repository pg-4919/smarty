const utils = require("../utils/utils.js");

module.exports = async message => {
    const { author, channel, client, guild } = message;
    const { news, chat } = client.config.channels;

    if (client.cloned.has(message.id)) console.log("oh Shit!")
}