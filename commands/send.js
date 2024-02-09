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
        .toJSON(),

    async respond(interaction) {
        const { client, guild, member, options } = interaction;
        const message = options.getString("message");
        const channel = options.getChannel("channel") || interaction.channel;

        channel.send(message);
        
        await interaction.editReply({ embeds: [embed], ephemeral: true, components: [utils.share.button()] });

        return interaction;
    }
}