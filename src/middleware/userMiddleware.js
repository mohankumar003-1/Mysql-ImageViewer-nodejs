const bodyParser = require('body-parser');
const session = require('express-session');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'admin',
    resave: true,
    saveUninitialized: true
}));
