const discord = require("discord.js");
const utils = require("../utils/utils.js");
const fs = require("fs");

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("set")
        .setDescription("Set the channel type (admin only)")
        .addStringOption(option => option.setName("type")
            .setDescription("What to change the channel to")
            .setRequired(true)
            .addChoices(
                { name: "starred", value: "starred" },
                { name: "verify", value: "verify" },
                { name: "news", value: "news" },
                { name: "chat", value: "chat" }
            )
        )
        .addChannelOption(option => option.setName("channel")
            .setDescription("The channel to change")
            .addChannelTypes(discord.ChannelType.GuildText, discord.ChannelType.GuildAnnouncement)
            .setRequired(false)
        )
        .toJSON(),

    async respond(interaction) {
        const { channel, options, member, client } = interaction;
        const target = options.getChannel("channel") || channel;
        const type = options.getString("type");

        client.config.channels[type] = target.id;
        fs.writeFileSync(`${utils.path.root}/.config`, JSON.stringify(client.config));

        const embed = utils.embed(member).setDescription(`Changed <#${target.id}> to type \`${type}\``);

        await interaction.reply({ embeds: [embed], ephemeral: true, components: [utils.share.button()] });

        return interaction;
    }
}