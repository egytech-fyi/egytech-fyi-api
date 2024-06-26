import { Hono } from 'hono';
import participantsHandler from './participants';
import statsHandler from './stats';
import { Bindings } from '../types/bindings';

const routes = (app: Hono<{ Bindings: Bindings }>) => {
  app.get('/participants', participantsHandler);
  app.get('/stats', statsHandler);
};

export default routes;
