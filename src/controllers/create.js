const bcrypt = require('bcryptjs');
const db = require('../db/db'); // Adjust the path as needed

const signup = async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into the database
        const insertQuery = 'INSERT INTO users (username,  password) VALUES (?, ?)';

        // Assuming db.query is the method you use to execute queries
        await db.query(insertQuery, [username, hashedPassword]);

        res.redirect('/');
    } catch (error) {
        console.error('Error signing up: ', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { signup };

