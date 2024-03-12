const express = require('express');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');
const loginRoutes = require('./routes/loginRoutes'); // Import the new login route
const path = require('path');
const db = require('./db/db');
const cors = require('cors');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, '/public/login.html');
    res.sendFile(indexPath);
});

app.post('/login', loginRoutes);

app.use('/api', apiRoutes);

app.get('/viewImages', async (req, res) => {
    try {
        console.log('GET request to /viewImages');
        const selectQuery = 'SELECT * FROM images';
        const query = db.format(selectQuery);
        console.log('SQL Query:', query);

        const [results] = await db.query(selectQuery);

        console.log(results);
        res.json({ data: results, message: 'Hello from /viewImages' });
    } catch (error) {
        console.error('Error during image retrieval:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.delete('/deleteImage/:id', async (req, res) => {
    const imageId = req.params.id;

    try {
        const deleteQuery = 'DELETE FROM images WHERE id = ?';
        const query = db.format(deleteQuery, [imageId]);
        console.log('SQL Query:', query);

        const [result] = await db.query(deleteQuery, [imageId]);

        if (result.affectedRows > 0) {
            res.json({ message: 'Image deleted successfully' });
        } else {
            res.status(404).json({ error: 'Image not found' });
        }
    } catch (error) {
        console.error('Error during image deletion:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
    console.log(`Server is running in ${PORT}`);
});

