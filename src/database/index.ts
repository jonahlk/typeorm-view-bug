import {Connection, createConnection} from 'typeorm';
import dotenv                         from 'dotenv';
import {terminal}                     from 'terminal-kit';
import {CustomNamingStrategy}         from './custom-naming-strategy';


dotenv.config({});

class Database {

  public connection: Connection;

  constructor() {
    this.connectToDB();
  }

  private connectToDB(): void {
    console.log(__dirname);
    createConnection({
      type: 'postgres',
      host: process.env.DATABASE_HOST!,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      namingStrategy: new CustomNamingStrategy(),
      entities: [`${__dirname}/../app/**/*.entity.ts`],
      synchronize: false,
      logging: false,
    })
      .then(_con => {
        this.connection = _con;
        terminal.cyan(`[Database] - Connected to Database: ${process.env.DATABASE_NAME}\n`);

      })
      .catch(console.error);
  }
}

export const db = new Database();


