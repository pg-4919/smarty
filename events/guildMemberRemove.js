const utils = require("../utils/utils.js");

module.exports = async (member) => {
    const roles = member.roles;
    const customRole = roles.find(role => role.color !== 0);
    
    return customRole.delete({ reason: "No longer in use" });
}