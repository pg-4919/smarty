const discord = require("discord.js");

module.exports = {
    async clone(member, channel) {
        const webhook = await channel.createWebhook(member.nickname || member.user?.username || "Trump", {
            avatar: member.avatarURL(),
            reason: "Clone (web posts)"
        });
        return webhook;
    }
}
