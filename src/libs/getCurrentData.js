/**
 * getting data from an array
 * @param {*} arr the array (data sources)
 * @param {*} id the identifier for data that you will search
 * @returns the data if exist or empty array if none
 */
const getCurrentData = (arr, id) => arr.filter((val) => val.id === id);

module.exports = getCurrentData;
