const bcrypt = require('bcryptjs');
const db = require('../db/db'); // Adjust the path as needed

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Fetch user from the database based on the provided username
        const selectQuery = 'SELECT * FROM users WHERE username = ?';
        const [rows] = await db.query(selectQuery, [username]);

        if (rows.length === 0) {
            // User not found
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const storedPasswordHash = rows[0].password;

        // Compare the provided password with the stored hash
        const passwordMatch = await bcrypt.compare(password, storedPasswordHash);

        if (!passwordMatch) {
            // Passwords do not match
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Passwords match, login successful
        res.json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { login };

