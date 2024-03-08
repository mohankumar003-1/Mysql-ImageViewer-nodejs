const express = require('express');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');
const loginRoutes = require('./routes/loginRoutes'); // Import the new login route
const path = require('path');
const userDb = require('./db/userdb.js');
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

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running in ${PORT}`);
});

