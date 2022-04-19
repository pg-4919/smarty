const builders = require("@discordjs/builders");
const discord = require("discord.js");

module.exports = {
    name: "game",
    data: new builders.SlashCommandBuilder()
        .setName("game")
        .setDescription("Do stuff with games")
        .addSubcommand(subcommand =>
            subcommand
                .setName("start")
                .setDescription("Start a game based on your current channel"))
        .addSubcommand(subcommand =>
            subcommand
                .setName("end")
                .setDescription("End the game in your current channel"))
        .toJSON(),
    async execute(interaction) {
        switch (interaction.options.getSubcommand()) {
            case "start":
                switch (interaction.channel.name) {
                    case "acronym-game":
                        if (!interaction.client.states.get("acronym")) {
                            function createAcronym(len) {
                                const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                                let result = ""
                                for (let i = 0; i < len; i++ ) result += charset[Math.floor(Math.random() * charset.length)];
                                return result;
                            }

                            const client = interaction.client;
                            client.states.set("acronym", true);
                            client.players.set("acronym", []);

                            client.data.set("acronym", new discord.Collection());
                            client.data.get("acronym").set("currentAcronym", createAcronym(Math.floor(Math.random() * 2) + 3));
                            interaction.channel.send(client.data.get("acronym").get("currentAcronym"));

                            const acronymCollector = interaction.channel.createMessageCollector({ idle: 5 * 1000 * 60 });
                            acronymCollector.completedPlayers = [];
                            acronymCollector.on("collect", message => {
                                console.log(`${message.author.id} =?= ${client.user.id}`)
                                if (message.content === "") return;
                                if (message.author.id === client.user.id) return;
                                if (!client.players.get("acronym").includes(message.author.id)) return message.delete();

                                const firstLetters = message.content.match(/\b(\w)/g);
                                if (firstLetters === null) return;
                                
                                if (firstLetters.join("") !== client.data.get("acronym").get("currentAcronym").toLowerCase()) return message.delete();
                            
                                if (!acronymCollector.completedPlayers.includes(message.author.id)) acronymCollector.completedPlayers.push(message.author.id);

                                if (acronymCollector.completedPlayers.length === client.players.get("acronym").length) {
                                    acronymCollector.completedPlayers = [];
                                    client.data.get("acronym").set("currentAcronym", createAcronym(Math.floor(Math.random() * 2) + 3));
                                    acronymCollector.channel.send(client.data.get("acronym").get("currentAcronym"));
                                }

                                return;
                            });
                            client.handlers.set("acronym", acronymCollector);

                            await interaction.reply({
                                content: "@here",
                                embeds: [
                                    new discord.MessageEmbed()
                                        .setColor("#8d8d8d")
                                        .setDescription(`A game of **The Acronym Game** has begun! `)
                                        .setTimestamp()
                                        .setFooter({ text: "used /game start", iconURL: interaction.user.avatarURL() })
                                ],
                                components: [
                                    new discord.MessageActionRow()
                                        .addComponents(
                                            new discord.MessageButton()
                                                .setCustomId("joinAcronymGame")
                                                .setLabel("Join game")
                                                .setStyle("SUCCESS"),
                                        )
                                ]
                            });
                            const reply = await interaction.fetchReply();

                            joinCollector = reply.createMessageComponentCollector({ idle: 5 * 1000 * 60 });
                            joinCollector.on("collect", async join => {
                                if (client.players.get("acronym").includes(join.user.id)) return join.reply({
                                    embeds: [
                                        new discord.MessageEmbed()
                                            .setColor("#ff0000")
                                            .setDescription(`You have already joined this game!`)
                                            .setTimestamp()
                                            .setFooter({ text: "did a small brain", iconURL: interaction.user.avatarURL() })
                                    ],
                                    ephemeral: true
                                });
                                else {
                                    client.players.get("acronym").push(join.user.id);
                                    return await join.reply({
                                        embeds: [
                                            new discord.MessageEmbed()
                                                .setColor("#8d8d8d")
                                                .setDescription(`<@${join.user.id}> joined **The Acronym Game**!`)
                                                .setTimestamp()
                                                .setFooter({ text: "joined a game", iconURL: interaction.user.avatarURL() })
                                        ]
                                    });
                                }
                            });

                        } else interaction.reply("There's already a game running. Grow a brain.");
                    break;

                    default:
                        interaction.reply("Fuck you, you imbecile. This isn't a game channel.");
                }
            break;

            case "end":
                switch (interaction.channel.name) {
                    case "acronym-game":
                        if (interaction.client.states.get("acronym")) {
                            const client = interaction.client;
                            client.states.set("acronym", false);

                            const acronymCollector = client.handlers.get("acronym");
                            acronymCollector.stop();

                            interaction.reply("Game stopped.");
                        } else interaction.reply("There isn't a game running. Grow a brain.");
                    break;

                    default:
                        interaction.reply("Fuck you, you imbecile. This isn't a game channel.");
                }
            break;

            default:
                console.error("Something fucking HORRIBLe just happened help");
        }
    }
}