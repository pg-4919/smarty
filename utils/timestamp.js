module.exports = date => {
    const datestring = `${date.getDate()}-${date.getMonth()+1} ${date.getHours()}:${date.getMinutes()}`
    return datestring;
}