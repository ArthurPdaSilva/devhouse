import { Router } from 'express';
import multer from 'multer';
import HouseController from './controllers/HouseController';
import upload from './config/upload';

import SessionController from './controllers/SessionController';
import DashboardController from './controllers/DashboardController';
import ReserveController from './controllers/ReserveController';

const routes = new Router();
const uploads = multer(upload);

routes.post('/sessions', SessionController.store);

routes.post('/houses', uploads.single('thumbnail'), HouseController.store);
routes.get('/houses', HouseController.index);
routes.put(
  '/houses/:house_id',
  uploads.single('thumbnail'),
  HouseController.update
);
routes.delete('/houses', HouseController.destroy);

routes.get('/dashboard', DashboardController.show);

routes.post('/houses/:house_id/reserve', ReserveController.store);
routes.get('/reserves', ReserveController.index);
routes.delete('/reserves', ReserveController.destroy);
export default routes;
