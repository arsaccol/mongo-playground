const mongoose = require('mongoose');

const url = require('url');
const db_url = url.resolve(process.env.MONGODB_PATH, process.env.DB_NAME);

mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true });
