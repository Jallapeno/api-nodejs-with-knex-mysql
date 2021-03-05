// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    version: '5.7',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'api_node_dev'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`
    }
  },

  staging: {
    client: 'mysql',
    version: '5.7',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'api_node_hom'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`
    }
  },

  production: {
    client: 'mysql',
    version: '5.7',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'api_node'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`
    }
  }

};
