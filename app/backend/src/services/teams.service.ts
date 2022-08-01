import Team from '../database/models/teams';

class TeamsService {
  public static async getTeams(): Promise<Team[]> {
    const teams = Team.findAll();
    return teams;
  }
}

export default TeamsService;
