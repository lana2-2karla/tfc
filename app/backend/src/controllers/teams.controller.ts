import { Request, Response } from 'express';
// import { Ilogin } from '../interfaces/interface';
import TeamsService from '../services/teams.service';

class TeamsController {
  public static async getTeams(req: Request, res: Response) {
    const teams = await TeamsService.getTeams();
    res.status(200).json(teams);
  }
}

export default TeamsController;
