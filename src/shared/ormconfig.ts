import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'secret',
  database: process.env.DB_NAME || 'wallet_db',
  synchronize: false,
  logging: true,
  entities: ['src/auth/infraestructure/persistence/postrgres/entity/*.ts', 'src/wallet/insfraestructure/persistence/postgres/entity/*.ts'],
  migrations: ['src/shared/migrations/*.ts'],
});