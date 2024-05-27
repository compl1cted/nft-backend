import { DatabaseService } from './database.service';

export class DatabaseModule {
  private readonly databaseService: DatabaseService;
  constructor() {
    this.databaseService = new DatabaseService();
    this.databaseService.connect().catch(console.error);
  }

  public getService = () => this.databaseService;
}

export const dbModule = new DatabaseModule();
