// Update with your config settings.
require('dotenv').config();

const localPg = {
  host:'localhost', 
  port: 5432, 
  database: 'forum-busters', 
}



const heroku = process.env.DATABASE_URL 

const localPGConnection = `postgres://@localhost/forum-busters`
module.exports = {

  development: {
    client: 'pg',
    connection: heroku
  },

  staging: {
    client: 'pg',
    connection: heroku,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    useNullAsDefault: true, 
    connection: heroku,
    migrations: {
      directory: './migrations'
    },
    seeds:{
      directory: './seeds'
    },
    pool: {
      min: 2,
      max: 10
    },
  },
  testing: {
    client: 'pg',
    connection: {
      filename: './test.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
 
  

};