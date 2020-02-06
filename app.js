const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const api_signup_route = require('./routes/signup');
const api_login_route = require('./routes/login');

async function main() {
    app.use(express.json());

    app.use('/api/signup', api_signup_route);
    app.use('/api/login', api_login_route);


    app.listen(port, () => console.log(`Listening on port ${port}`));
}

(async () => {
    main();
})();