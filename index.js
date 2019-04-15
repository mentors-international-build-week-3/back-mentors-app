require('dotenv').config();
const server = require('./api/server.js');

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`\n** Mentors App server is up and running on port ${port} **\n`));