import { Request, Response } from 'express';
// import { Ilogin } from '../interfaces/interface';
import TeamsService from '../services/teams.service';

class TeamsController {
  public static async getTeams(req: Request, res: Response) {
    const teams = await TeamsService.getTeams();
    res.status(200).json(teams);
  }

  public static async getTeamsById(req: Request, res: Response) {
    const team = await TeamsService.getTeamsById(req.params.id);
    res.status(200).json(team);
  }
}

export default TeamsController;
