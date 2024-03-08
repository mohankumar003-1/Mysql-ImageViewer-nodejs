const db = require('../db'); // Adjust the path as needed

const saveImagesToDb = async (req, res) => {
    try {
        const images = req.files;

        if (!images || images.length === 0) {
            return res.status(400).json({ error: 'No images uploaded.' });
        }

        // Save images to the database
        const insertQuery = 'INSERT INTO images (filename, data) VALUES (?, ?)';
        const promises = images.map((image) => {
            return db.execute(insertQuery, [image.originalname, image.buffer]);
        });

        await Promise.all(promises);

        res.json({ success: true, message: 'Images uploaded successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { saveImagesToDb };

