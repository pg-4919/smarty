module.exports = (collection, term, property = "name") => {
    console.log(collection);
    return collection.find(item => {
        console.log(item);
        return item["name"] === term;
    }) || null;
}