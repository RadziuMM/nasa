import * as dotenv from 'dotenv';
dotenv.config();
export const port = 7000;
export const database = {
  host: process.env.HOST || '127.0.0.1',
  username: process.env.USERNAME || 'admin',
  password: process.env.PASSWORD || 'admin',
  portdb: process.env.PORTDB || 3306,
  database: process.env.DATABASE || 'db',
};
export const nasaAPI = {
  key: process.env.KEY,
};
