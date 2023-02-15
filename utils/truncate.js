module.exports = (content, length) => {
    const clean = content.replace(/([*])|(\|{2,})|(_{2,})|(^(> ))/g, "");
    return ((clean.length > length) ? clean.slice(0, length) + "..." : clean).replace(/\n/g, " ");
}