import { Router, Request, Response } from 'express';
import loginValidate from '../middlewares/login.validate';
import UserTokenController from '../controllers/login.controller';
import TeamsController from '../controllers/teams.controller';
import MatchesController from '../controllers/matches.controller';
import authTokenMiddleware from '../middlewares/token.validate';

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

routers.get('/teams/:id', (req: Request, res: Response) => TeamsController.getTeamsById(req, res));

routers.get('/matches', (req: Request, res: Response) => MatchesController.getMatches(req, res));

routers.post(
  '/matches',
  authTokenMiddleware.authToken,
  (req: Request, res: Response) => MatchesController.createNewMatch(req, res),
);

routers.patch(
  '/matches/:id/finish',
  (req: Request, res: Response) => MatchesController.updateInProgress(req, res),
);

export default routers;
