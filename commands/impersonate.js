const discord = require("discord.js");
const utils = require("../utils/utils.js");
const fs = require("fs");

const impersonations = new discord.Collection();

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("impersonate")
        .setDescription("Impersonate another member")
        .addSubcommand(subcommand => subcommand
            .setName("start")
            .setDescription("Start impersonating someone")
            .addUserOption(option => option
                .setName("person")
                .setDescription("The person to impersonate")
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName("stop")
            .setDescription("Stop impersonating someone")
        )
        .addSubcommand(subcommand => subcommand
            .setName("view")
            .setDescription("View current impersonations")
        )
        .toJSON(),

    async respond(interaction) {
        const member = interaction.member;
        const guild = interaction.guild;
        const embed = new discord.EmbedBuilder()
            .setColor("#2F3136")
            .setTimestamp();

        switch (interaction.options.getSubcommand()) {
            case "start":
                const target = interaction.options.getMember("person");

                embed.setDescription(`Started impersonating ${target.displayName}`)
                    .setTimestamp()
                    .setFooter({ text: "became a ventriloquist", iconURL: member.avatarURL() });
                
                impersonations.set(member.user.id, { imposter: member, target: target });
                await interaction.editReply({ embeds: [embed], ephemeral: true });
                break;

            case "stop":
                embed.setDescription(`Stopped impersonating ${impersonations.get(member.id).imposter.displayName}`)
                    .setFooter({ text: "left the criminal underworld", iconURL: member.avatarURL() });

                impersonations.delete(member.user.id)
                await interaction.reply({ embeds: [embed], ephemeral: true });
                break;

            case "view":
                if (impersonations.length > 0) {
                    const text = [];

                    impersonations.each(impersonation => {
                        const imposter = impersonation.imposter.displayName;
                        const target = impersonation.target.displayName;
                        text.push(`${impersonator} is impersonating ${target}`);
                    })

                    embed.setTitle("Current impersonations")
                        .setDescription(text.join("\n"))
                        .setFooter({ text: "was the imposter", iconURL: member.avatarURL() });

                    await interaction.reply({ embeds: [embed] });
                } else await interaction.reply("No one is impersonating anyone")

                break;
        }
    },

    fetch() {
        return impersonations;
    }
}