const utils = require("../utils/utils.js");

module.exports = async (member) => {
    const guild = member.guild;
    const roles = guild.roles.cache;

    roles.each(async role => { if (role.members.size === 0) await role.delete() });
    
    return;
}