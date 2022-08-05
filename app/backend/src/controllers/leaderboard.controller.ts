import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

class LeaderboardController {
  public static async getTeamsHome(req: Request, res: Response) {
    const teamsHome = await LeaderboardService.getTeamsHome();
    res.status(200).json(teamsHome);
  }
}

export default LeaderboardController;
