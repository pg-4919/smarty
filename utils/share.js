const templates = require("./embed.js")
const discord = require("discord.js");

function button(disabled = false) {
    return new discord.ActionRowBuilder()
        .addComponents(
            new discord.ButtonBuilder()
                .setCustomId("share")
                .setLabel("Share")
                .setStyle(discord.ButtonStyle.Secondary)
                .setDisabled(disabled)
        );
}

module.exports = {
    button: button,

    async await(interaction) {
        const reply = await interaction.fetchReply().catch(() => {});
        if (!reply) return;
        reply.awaitMessageComponent(button => button.customId === "share")
            .then(press => {
                press.reply({ embeds: reply.embeds });
                interaction.editReply({ embeds: reply.embeds, components: [button(true)] });
            })
            .catch(console.log);
    }
}