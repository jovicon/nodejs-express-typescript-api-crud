import * as dotenv from 'dotenv';

dotenv.config();

interface Credentials {
  db: string | undefined;
  url: string | undefined;
  port: string | undefined;
  user: string | undefined;
  password: string | undefined;
}

export const credentials: Credentials = {
  db: process.env.MONGO_DB,
  url: process.env.MONGO_URL,
  port: process.env.MONGO_PORT,
  user: process.env.MONGO_USER,
  password: process.env.MONGO_PASSWORD,
};
