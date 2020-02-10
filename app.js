const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

require('./db/db');

const api_users_router = require('./routes/users_router');

async function main() {
    app.use(express.json());

    app.use('/users', api_users_router);


    app.listen(port, () => console.log(`Listening on port ${port}`));
}

(async () => {
    main();
})();