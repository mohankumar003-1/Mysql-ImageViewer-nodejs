const express = require('express');
const router  = express.Router();
const upload = require('../middleware/upload');
const save =  require('../controllers/save');
const createUser = require('../controllers/create');
router.post('/upload', upload.array('images'), save.saveImagesToDb);

router.post('/signup', async (req, res) => {
    try {
        await createUser.signup(req, res);
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//router.get('/data',dataController.getData);
//router.get('/upload',dataController.test);
//router.get('/create',dataController.createTable);
module.exports = router;
