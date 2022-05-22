const builders = require("@discordjs/builders");
const discord = require("discord.js");

module.exports = {
    name: "feature",
    data: {
        name: "feature",
        type: 3,
        description: "Feature a message in #featured"
    },
    async execute(interaction) {
        interaction.channel.send(`\`\`\`json${JSON.stringify(interaction)}\`\`\``);
    }
}