const discord = require("discord.js");
const utils = require("../utils/utils.js");
const fs = require("fs");

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("channel")
        .setDescription("Make a channel special")
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
        const { channel, options, member, client, user } = interaction;
        const embed = utils.embed(member);
        const target = options.getChannel("channel") || channel;
        const type = options.getString("type");

        if (!client.config.admins.includes(user.id))
            embed.setDescription(`You don't have permission to use this command.`);
        else {
            client.config.channels[type] = target.id;
            fs.writeFileSync(`${utils.path.root}/.config`, JSON.stringify(client.config));
            embed.setDescription(`Changed <#${target.id}> to type \`${type}\``);    
        }

        await interaction.reply({ embeds: [embed], ephemeral: true, components: [utils.share.button()] });

        return interaction;
    }
}