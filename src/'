const express = require('express');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');
const path = require('path');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'index (1).html');
    res.sendFile(indexPath);
});

app.use('/api',apiRoutes);
app.listen(PORT,()=>{

    console.log(`Server is running in ${PORT}`);
});

