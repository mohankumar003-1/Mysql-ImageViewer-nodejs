const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');

router.post('/login', async (req, res) => {
    try {
        // Call the login controller method
        await loginController.login(req, res);
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

