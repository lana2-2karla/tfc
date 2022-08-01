import { Router, Request, Response } from 'express';
import loginValidate from '../middlewares/login.validate';
import UserTokenController from '../controllers/login.controller';

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

export default routers;
