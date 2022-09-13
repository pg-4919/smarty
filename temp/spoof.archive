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
        .setDescription("Impersonate someone else")
        .addSubcommand(subcommand => subcommand
            .setName("start")
            .addUserOption(option => option
                .setName("person")
                .setDescription("The person to impersonate")
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName("stop").setDescription("Stop spoofing")
        )
        .addSubcommand(subcommand => subcommand
            .setName("view").setDescription("View current spoofs")
            
        )
        .toJSON(),

    async respond(interaction) {
        const member = interaction.member;
        const guild = interaction.guild;
        const embed = new discord.EmbedBuilder() //placing embed builder here prevents duplicate code
            .setColor("#2F3136")
            .setTimestamp();

        switch (interaction.options.getSubcommand()) {
            case "start":
                const target = interaction.options.getMember("person");

                embed.setDescription(`Started impersonating <@${target.id}>`)
                    .setTimestamp()
                    .setFooter({ text: `became ${target.displayName}`, iconURL: member.avatarURL() });
                
                spoofs.set(member.user.id, { imposter: member, target: target });
                await interaction.reply({ embeds: [embed], ephemeral: true });
                break;

            case "stop":
                embed.setDescription(`Stopped impersonating <@${spoofs.get(member.id).imposter.id}>`)
                    .setFooter({ text: "left the criminal underworld", iconURL: member.avatarURL() });

                spoofs.delete(member.user.id)
                await interaction.reply({ embeds: [embed], ephemeral: true });
                break;

            case "view":
                if (spoofs.length > 0) {
                    const summary = [];

                    spoofs.each(spoof => {
                        const imposterId = spoof.imposter.id;
                        const targetId = spoof.target.id;
                        summary.push(`<@${imposterId}> is impersonating <@${targetId}>`);
                    })

                    embed.setTitle("Current impersonations")
                        .setDescription(summary.join("\n"))
                        .setFooter({ text: "was the imposter", iconURL: member.avatarURL() });

                    await interaction.reply({ embeds: [embed] });
                } else await interaction.reply("No one is impersonating anyone")

                break;
        }
    },

    fetch() {
        return spoofs;
    }
}