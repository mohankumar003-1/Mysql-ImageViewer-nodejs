const db = require('../db');

const saveImageToDb = async (req, res) => {
    try {
        const { filename, data } = req.body;

        if (!filename || !data) {
            return res.status(400).json({ error: 'Filename and data are required.' });
        }

        const insertQuery = `
            INSERT INTO images (filename, data)
            VALUES (?, ?);
        `;
        await db.execute(insertQuery, [filename, data]);

        res.json({ success: true, message: 'Image saved to database successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createTable = async (req, res) => {
    try {
        const { tableName } = req.query;

        if (!tableName) {
            return res.status(400).json({ error: 'Table name is required.' });
        }

        const checkQuery = `
            SELECT TABLE_NAME
            FROM INFORMATION_SCHEMA.TABLES
            WHERE TABLE_SCHEMA = 'test' AND TABLE_NAME = ?;
        `;
        const tableExists = await db.query(checkQuery, [tableName]);

        if (tableExists.length > 0) {
            return res.status(400).json({ error: 'Table already exists.' });
        }

        const createTableQuery = `
            CREATE TABLE ${tableName} (
                id INT AUTO_INCREMENT PRIMARY KEY,
                filename VARCHAR(255) NOT NULL,
                data LONGBLOB NOT NULL
            );
        `;
        await db.execute(createTableQuery);

        res.json({ success: true, message: `Table ${tableName} created successfully.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { saveImageToDb, createTable };

