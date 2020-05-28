const env = process.env.NODE_ENV;
const config = {
  development: {
    type: 'mysql',
    host: 'localhost',
    port: '3306',
    username: 'user',
    password: 'password',
    database: 'dna',
    entities: ['**/*.entity{.ts,.js}'],
    migrations: ['database/migration/*.ts'],
    cli: {
      migrationsDir: 'database/migration',
    },
  }
};

module.exports = config[env];
