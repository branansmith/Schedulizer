const database = require('../database/Database');

async function getTimes(date) {
    const times = await database.getEmployeeTimes(date);

    return times;
}

module.exports = {
    getTimes
};


