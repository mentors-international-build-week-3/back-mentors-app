require('dotenv').config();
const server = require('./server.js');
// const serverPostgresql = require('./api/serverPostgresql.js');

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`\n** The Mentors App server is up and running on port ${port} **\n`));

// const portPostgresql = process.env.PORT_POSTGRESQL || 6000;
// serverPostgresql.listen(portPostgresql, () => console.log(`\n** Mentors Int'l App (PostgreSQL) server is up and running on port ${portPostgresql} **\n`));