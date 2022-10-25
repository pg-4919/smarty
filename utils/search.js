module.exports = (collection, term, property = "name") => {
    return collection.find(item => item[property] === term) || null;
}