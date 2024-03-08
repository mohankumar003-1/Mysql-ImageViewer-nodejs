const express = require('express');
const router  = express.Router();

const upload = require('../middleware/upload');
const save =  require('../controllers/save');
router.post('/upload', upload.array('images'), save.saveImagesToDb);
//router.get('/data',dataController.getData);
//router.get('/upload',dataController.test);
//router.get('/create',dataController.createTable);
module.exports = router;
