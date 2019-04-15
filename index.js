require('dotenv').config();
const serverMongo = require('./api/serverMongo.js');
// const serverPostgresql = require('./api/serverPostgresql.js');

const portMongo = process.env.PORT_MONGO || 4000;
serverMongo.listen(portMongo, () => console.log(`\n** Mentors Int'l App (MongoDB) server is up and running on port ${portMongo} **\n`));

// const portPostgresql = process.env.PORT_POSTGRESQL || 6000;
// serverPostgresql.listen(portPostgresql, () => console.log(`\n** Mentors Int'l App (PostgreSQL) server is up and running on port ${portPostgresql} **\n`));