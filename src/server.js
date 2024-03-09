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
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
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

        // Use a Promise to await the database query
        const [results] = await db.query(selectQuery);

        console.log(results);
        // Send the response as JSON
        res.json({ data: results, message: 'Hello from /viewImages' });
    } catch (error) {
        console.error('Error during image retrieval:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running in ${PORT}`);
});

