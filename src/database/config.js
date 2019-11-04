import dotenv from 'dotenv';

dotenv.config();

export default () => ({
    development: {
        client: process.env.DATABASE_CLIENT,
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './src/database/migrations'
        }
    },

    test: {
        client: process.env.DATABASE_CLIENT,
        connection: process.env.TEST_DATABASE_URL,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './src/database/migrations'
        }
    },

    production: {
        client: process.env.DATABASE_CLIENT,
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './src/database/migrations'
        }
    }
});