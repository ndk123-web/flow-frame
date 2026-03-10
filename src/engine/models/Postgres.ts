import type { NodeInstance } from "../contracts";

class PostgresModel implements NodeInstance {
  id: string;
  name: string;
  type: string = "POSTGRES_DATABASE";
  data: Map<string, any> = new Map();

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  addRecord(databaseName: string, primaryKey: string, record: any) {
    const db = this.data.get(databaseName) || new Map();
    db.set(primaryKey, record);
    this.data.set(databaseName, db);
  }

  deleteRecord(databaseName: string, primaryKey: string) {
    const db = this.data.get(databaseName);
    if (db) {
      db.delete(primaryKey);
    }
  }

  getRecord(databaseName: string, primaryKey: string) {
    const db = this.data.get(databaseName);
    if (db) {
      return db.get(primaryKey) ?? null;
    }
  }
}

export default PostgresModel;
