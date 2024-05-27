import { DataSource, EntityTarget } from 'typeorm';
import { MAX_CONNECTION_ATTEMPTS } from './database.consts';
import * as process from 'node:process';

export class DatabaseService {
  private dataSource: DataSource;

  constructor() {
    this.dataSource = new DataSource({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    });
  }

  async connect() {
    let attempts = 0;
    while (attempts < MAX_CONNECTION_ATTEMPTS) {
      console.log('Connecting to database...');
      try {
        const result = await this.dataSource.initialize();
        if (result.isInitialized) break;
      } catch (error) {
        console.error(`Failed to connect to the database! Error: ${error}`);
        attempts++;
      }
    }
  }

  public getRepository<Entity>(entity: EntityTarget<Entity>) {
    return this.dataSource.getRepository<Entity>(entity);
  }
}
