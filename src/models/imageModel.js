const db = require('../db/db')
const displayImage = function (callback) {
    var sql = 'SELECT filename FROM images';

    db.query(sql)
        .then(([rows, fields]) => {
            callback(rows);
        })
        .catch((error) => {
            console.error(error); // Log the error for debugging
            throw error;
        });
};
module.exports = { displayImage };
