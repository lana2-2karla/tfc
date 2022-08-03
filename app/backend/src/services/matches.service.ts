import { IMatch } from '../interfaces/interface';
import Match from '../database/models/matches';
import HttpException from '../utils/http.exception';
import Team from '../database/models/teams';

class MatchesService {
  public static async getMatches(): Promise<Match[]> {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  public static async getMatchesByInProgress(inProgress: boolean): Promise<Match[]> {
    const matches = await Match.findAll({
      where: {
        inProgress,
      },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  public static async createNewMatch(matchData: IMatch) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = matchData;
    if (homeTeam === awayTeam) {
      throw new HttpException(401, 'It is not possible to create a match with two equal teams');
    }
    const isRepeatedHome = await Team.findOne({ where: { id: homeTeam } });

    const isRepeatedAway = await Team.findOne({ where: { id: awayTeam } });
    if (!isRepeatedHome || !isRepeatedAway) {
      throw new HttpException(404, 'There is no team with such id!');
    }
    const newMatch = await Match
      .create({ homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress: true });
    return newMatch;
  }

  public static async updateInProgress(id: string) {
    const isUpdateMatch = Match.update({ inProgress: false }, { where: { id } });
    return isUpdateMatch;
  }

  public static async updateInProgressTrue(id: string, matchData:IMatch) {
    const { homeTeamGoals, awayTeamGoals } = matchData;
    const isUpdateMatch = Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return isUpdateMatch;
  }
}

export default MatchesService;
