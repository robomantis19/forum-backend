const knex = require('knex');
const config = require('../knexfile.js');
let client
switch(process.env.DB_ENV) {
    case 'production':
        client = knex(config.production) //for heroku postgres
        break
    case 'test':
        client = knex(config.testing)
        break
    default:
        client = knex(config.development) //for testing and running SQLite
}
module.exports = client