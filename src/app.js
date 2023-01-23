import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member, import/no-extraneous-dependencies
import * as dotenv from 'dotenv';
import routes from './routes';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.database();
    this.routes();
  }

  database() {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.DATABASE_ACCESS);
  }

  middlewares() {
    // Cors limita o acesso a api
    // this.server.use(cors({origin: "/....."}))
    this.server.use(cors());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    );
    this.server.use(express.json());
    dotenv.config();
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
