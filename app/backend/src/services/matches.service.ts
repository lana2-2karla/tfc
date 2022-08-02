import Match from '../database/models/matches';

class MatchesService {
  public static async getMatches(): Promise<Match[]> {
    const matches = Match.findAll();
    return matches;
  }
}

export default MatchesService;
