import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

class MatchesController {
  public static async getMatches(req: Request, res: Response) {
    let matches;
    if (req.query.inProgress) {
      const boolInProgress = req.query.inProgress === 'true';
      matches = await MatchesService.getMatchesByInProgress(boolInProgress);
    } else {
      matches = await MatchesService.getMatches();
    }
    res.status(200).json(matches);
  }
}

export default MatchesController;
