// postgres.ts
import { Client } from 'pg';

const postgresConfig = {
  user: 'your_postgres_user',
  host: 'your_postgres_host',
  database: 'your_database_name',
  password: 'your_postgres_password',
  port: 5432,
};

const client = new Client(postgresConfig);

async function connectToPostgres() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL');
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
  }
}

connectToPostgres();
export { client };