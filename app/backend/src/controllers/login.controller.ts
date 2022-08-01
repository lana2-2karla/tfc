import { Request, Response } from 'express';
// import { Ilogin } from '../interfaces/interface';
import UserTokenService from '../services/login.service';

class UserTokenController {
  private service: UserTokenService;

  constructor() {
    this.service = new UserTokenService();
  }

  public async UserToken(req: Request, res: Response) {
    const token = await this.service.authLogin(req.body);
    res.status(200).json(token);
  }

  public async UserRole(req: Request, res: Response) {
    const role = await this.service.roleUser(req.headers.authorization);
    res.status(200).json(role);
  }
}

export default UserTokenController;
