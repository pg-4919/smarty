module.exports = {
    async clone(member, channel) {
        const webhook = await channel.createWebhook(member.nickname || member.user.username, {
            avatar: member.avatarURL(),
            reason: "Clone (web posts)"
        });
        return webhook;
    }
}