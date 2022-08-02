import { NextFunction, Request, Response } from 'express';
import TokenGenerate from '../utils/jwtToken';
import HttpException from '../utils/http.exception';

class authTokenMiddleware {
  static async authToken(req: Request, _res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) throw new HttpException(401, 'Token must be a valid token');
    const classToken = new TokenGenerate();
    await classToken.authenticateToken(authorization);
    next();
  }
}

export default authTokenMiddleware;
