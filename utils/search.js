module.exports = async (collection, term, property = "name") => {
    return collection.find(item => item[property] === term) || null;
}