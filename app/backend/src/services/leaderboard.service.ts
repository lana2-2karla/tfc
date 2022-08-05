import Team from '../database/models/teams';
import Match from '../database/models/matches';
import leaderboardTime from '../utils/leaderboardTime';

class LeaderboardService {
  public static async getTeamsHome() {
    const matches = await Match.findAll({
      where: {
        inProgress: false,
      },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    const teams = await Team.findAll();
    const leaderboards = teams.map((team) => {
      const homeMatch = matches.filter((match) => match.homeTeam === team.id);
      return leaderboardTime(team, homeMatch);
    });
    return leaderboards.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor);
  }
}

export default LeaderboardService;
