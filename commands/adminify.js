const discord = require("discord.js");
const utils = require("../utils/utils.js");
const fs = require("fs");

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("adminify")
        .setDescription("Toggle Overrides status (Peter only)")
        .addUserOption(option => option
            .setName("target")
            .setDescription("Whose avatar to enhance (leave blank for yourself)")
            .setRequired(false)
        )
        .toJSON(),

    async respond(interaction) {
        const { guild, member, user, options } = interaction;
        const embed = new discord.EmbedBuilder()
            .setColor("#2F3136")
            .setTimestamp()
            .setFooter({ text: "​", iconURL: member.displayAvatarURL() });
        
        const target = options.getMember("target") || member;
        const roles = target.roles;
        const overrides = "878033546848108606";

        if (user.id !== "") 
            interaction.reply({ embeds: [ embed.setDescription(`This command is Peter-only.`) ]});
        
        if (roles.cache.has(overrides)) roles.remove(overrides);
        else roles.add(overrides)

        interaction.reply({ embeds: [ embed.setDescription(`Changed the status of ${target.nickname}`) ]});

        return;
    },

    fetch() {
        return spoofs;
    }
}