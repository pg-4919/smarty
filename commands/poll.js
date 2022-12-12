const discord = require("discord.js");
const utils = require("../utils/utils.js");
const fs = require("fs")

const numbers = [
    "1️⃣",
    "2️⃣",
    "3️⃣",
    "4️⃣",
    "5️⃣",
    "6️⃣",
    "7️⃣",
    "8️⃣",
    "9️⃣",
    "🔟"
]

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("poll")
        .setDescription("Create a poll")
        .addStringOption(option => option.setName("question")
            .setDescription("The question you're asking")
            .setRequired(true)
        )
        .addStringOption(option => option.setName("choices")
            .setDescription("A comma seperated list of choices")
            .setRequired(true)
        )
        .addIntegerOption(option => option.setName("time")
            .setMinValue(1)
            .setMaxValue(1440)
            .setDescription("The time limit for the poll, in minutes")
            .setRequired(true)
        )
        .toJSON(),

    async respond(interaction) {
        const { options, member } = interaction;
        const choices = options.getString("choices").split(",");
        const question = options.getString("question");
        const time = options.getInteger("time") * 60000;
        const embed = utils.embed(member);

        for (let i = 0; i < choices.length; i++)
            choices[i] = `\`${i + 1}\`: ${choices[i]}`;

        embed.setDescription(choices.join("\n")).setTitle(question);
        await interaction.reply({ embeds: [embed] });
        const reply = await interaction.fetchReply();

        for (let i = 0; i < choices.length; i++)
            await reply.react(`${numbers[i]}`);

        const filter = reaction => numbers.includes(reaction.emoji?.name);
        const collector = await reply.createReactionCollector({ dispose: true, time, filter });

        return interaction;
    }
}