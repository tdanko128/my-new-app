const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json()); // Parse JSON request bodies
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/index'));

// API Routes
// const authenticate_api_key = require('./middleware/authenticate_api_key');
// app.use('/api', authenticate_api_key, require('./routes/api'));


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
