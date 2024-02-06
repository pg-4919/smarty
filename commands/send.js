const discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("send")
        .setDescription("Send a message as our almighty Daddy")
        .addChannelOption(option => option.setName("channel")
            .setDescription("Where to send it")
            .setRequired(false)
        )
        .addStringOption(option => option.setName("message")
            .setDescription("What to send")
        )
        .toJSON(),

    async respond(interaction) {
        const { user, options, client } = interaction;
        
        const channel = options.getMember("channel") || interaction.channel;
        const message = options.getString("message");

        if (!client.config.admins.includes(user.id))
            embed.setDescription(`You don't have permission to use this command.`);
        else {
            channel.send(message.content);
        }
    },
}