const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const api_signup_route = require('./routes/signup');

app.use(express.json());

app.use('/api/signup', api_signup_route);


app.listen(port, () => console.log(`Listening on port ${port}`));

