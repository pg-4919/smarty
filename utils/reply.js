module.exports = async message => {
    const { reference, type, channel, client } = message;
    const { curved, straight } = client.configemojis;

    if (!(reference && type === 19)) return undefined;

    const original = await channel.messages.fetch(reference.messageId);
    const content = clean(truncate(original.content, 50));
    const mention = `<@${(original.author.id || "1".repeat(19))}>`;
    const reply = `<:curved:${curved}> ${mention} ${content}\n<:straight:${straight}>\n `;
    return reply;
}