import { Router, Request, Response } from 'express';
import loginValidate from '../middlewares/login.validate';
import UserTokenController from '../controllers/login.controller';
import TeamsController from '../controllers/teams.controller';

const routers: Router = Router();

const userTokenController = new UserTokenController();
routers.post(
  '/login',
  loginValidate.validateSchema,
  (req: Request, res: Response) => userTokenController.UserToken(req, res),
);

routers.get(
  '/login/validate',
  (req: Request, res: Response) => userTokenController.UserRole(req, res),
);

routers.get('/teams', (req: Request, res: Response) => TeamsController.getTeams(req, res));

export default routers;
