const builders = require("@discordjs/builders");
const discord = require("discord.js");
const utils = require("../utils/utils.js");
const mexpr = require("math-expression-evaluator")

module.exports = {
    name: "math",

    data: new builders.SlashCommandBuilder()
        .setName("math")
        .setDescription("Evaluate a mathematical expression")
        .addStringOption(option => option.setName("expr").setDescription("The expression to evaluate").setRequired(true))
        .toJSON(),

    async execute(interaction) {
        const expr = interaction.options.getString("expr");
        try {
            const embed = new discord.MessageEmbed()
                .setColor("#FF0000")
                .setTimestamp()
                .setDescription(`Not a valid hex code.`)
                .setFooter({ text: "did a stupid", iconURL: interaction.member.user.avatarURL() });
            interaction.reply({ embeds: [embed], ephemeral: true });
        } catch {
            const rolemaps = require(`${utils.root}/assets/rolemaps.json`);
            interaction.guild.roles.edit(rolemaps[interaction.user.id], { color: hex }).then(() => {
                const embed = new discord.MessageEmbed()
                    .setColor("#636363")
                    .setTimestamp()
                    .setDescription(`You changed your color to #${hex}.`)
                    .setFooter({ text: "changed their color", iconURL: interaction.member.user.avatarURL() });
                interaction.reply({ embeds: [embed], ephemeral: true });
            }).catch(() => { /**/ });
        }
    }
}