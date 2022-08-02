import Team from '../database/models/teams';

class TeamsService {
  public static async getTeams(): Promise<Team[]> {
    const teams = Team.findAll();
    return teams;
  }

  public static async getTeamsById(id: string): Promise<Team | null> {
    const team = Team.findByPk(id);
    return team;
  }
}

export default TeamsService;
