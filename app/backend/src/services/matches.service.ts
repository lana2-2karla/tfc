import Match from '../database/models/matches';

class MatchesService {
  public static async getMatches(): Promise<Match[]> {
    const matches = Match.findAll();
    return matches;
  }

  public static async getMatchesByInProgress(inProgress: boolean): Promise<Match[]> {
    const matches = Match.findAll({
      where: {
        inProgress,
      },
    });
    return matches;
  }
}

export default MatchesService;
