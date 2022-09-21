const discord = require("discord.js");
const utils = require("../utils/utils.js");
const fs = require("fs");

const spoofs = new discord.Collection();

/*
Notes:

The spoof command uses the global storage variable spoofs,
which is a discord collection with structure of { id: spoof }.
A spoof is further broken down into { imposter: member, target: member }
where both values are of type discord.GuildMember. 

Furthermore, this command demonstrates two conventions used in 
Smarty: subcommand parsing using switch statements and display of
members in embeds using mentions.
*/

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("spoof")
        .setDescription("See another person's avatar (or your own)")
        .addUserOption(option => option
            .setName("target")
            .setDescription("Whose avatar to enhance (leave blank for yourself)")
            .setRequired(false)
        )
        .toJSON(),

    async respond(interaction) {
        const member = interaction.member;
        const guild = interaction.guild;

        const target = interaction.options.getMember("target") || member;

        const avatarUrl = target.displayAvatarURL();

        const embed = new discord.EmbedBuilder.setColor("#2F3136")
            .setImage(avatarUrl)
            .setTimestamp()
            .setFooter({ text: `enhanced ${target.displayName}'s face`, iconURL: member.displayAvatarURL() });

        interaction.reply({ embeds: [embed] });

        return;
    },

    fetch() {
        return spoofs;
    }
}