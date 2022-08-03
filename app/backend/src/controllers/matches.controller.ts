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

  public static async createNewMatch(req: Request, res: Response) {
    const newMatch = await MatchesService.createNewMatch(req.body);
    res.status(201).json(newMatch);
  }

  public static async updateInProgress(req: Request, res: Response) {
    const isUpdateMatch = await MatchesService.updateInProgress(req.params.id);
    if (isUpdateMatch) return res.status(200).json({ message: 'Finished' });
  }
}

export default MatchesController;
