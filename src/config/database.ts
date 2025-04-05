// server/config/database.ts
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER ,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  schema: process.env.POSTGRES_SCHEMA,
  synchronize:false, // Sincroniza apenas em desenvolvimento
  logging: process.env.MODE === 'development', // Logs apenas em desenvolvimento
  entities: ['src/entities/**/*.{ts,js}'],
  subscribers: [],
  migrations: ['src/migrations/**/*.{ts,js}'],
  // Configuração de SSL para Neon
  ssl: true, // Habilita SSL
  extra: {
    ssl: {
      rejectUnauthorized: false, // Aceita certificados não autorizados (apenas para desenvolvimento)
    },
  },
});

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');
    return true;
  } catch (error) {
    console.error('Error during Data Source initialization:', error);
    return false;
  }
};