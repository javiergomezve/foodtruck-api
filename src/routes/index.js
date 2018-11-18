import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializeDb from '../db';
import restaurant from '../controller/foodtruck';

const router = express();

initializeDb(db => {
  router.use(middleware({config, db}));

  router.use('/foodtruck', restaurant({config, db}));
});

export default router;
