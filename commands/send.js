const discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("send")
        .setDescription("Send a message as Smarty")
        .addStringOption(option => option
            .setName("message")
            .setDescription("The message to send")
            .setRequired(true)
        )
        .addChannelOption(option => option
            .setName("channel")
            .setDescription("Where to send the message to")
            .setRequired(false)
        )
        .addStringOption(option => option
            .setName("reply")
            .setDescription("Who to reply to")
            .setRequired(false)
        )
        .toJSON(),

    async respond(interaction) {
        const { client, user, options } = interaction;
        const message = options.getString("message");
        const channel = options.getChannel("channel") || interaction.channel;
        const reply = options.getString("reply") || null;

        if (!client.config.admins.includes(user.id)) return;
        
        if (reply !== null) (await interaction.channel.messages.fetch(reply)).reply(message);
        else channel.send(message);

        await interaction.reply({ content: "dick", ephemeral: true });

        return interaction;
    }
}