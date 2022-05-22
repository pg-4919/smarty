const builders = require("@discordjs/builders");
const discord = require("discord.js");

module.exports = {
    name: "feature",
    data: {
        name: "feature",
        type: 3
    },
    async execute(interaction) {
        interaction.channel.send(`\`\`\`json${JSON.stringify(interaction)}\`\`\``);
    }
}