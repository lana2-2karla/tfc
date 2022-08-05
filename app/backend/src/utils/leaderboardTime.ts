import Team from '../database/models/teams';
import { IMatch } from '../interfaces/interface';

const victories = (homeMatch: IMatch[]) => {
  let victoria = 0;
  homeMatch.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) victoria += 1;
  });
  return victoria;
};

const draws = (homeMatch: IMatch[]) => {
  let draw = 0;
  homeMatch.forEach((match) => {
    if (match.homeTeamGoals === match.awayTeamGoals) draw += 1;
  });
  return draw;
};

const losses = (homeMatch: IMatch[]) => {
  let lose = 0;
  homeMatch.forEach((match) => {
    if (match.homeTeamGoals < match.awayTeamGoals) lose += 1;
  });
  return lose;
};

const goals = (homeMatch: IMatch[]) => {
  let gol = 0;
  homeMatch.forEach((match) => {
    gol += match.homeTeamGoals;
  });
  return gol;
};

const goalsOnw = (homeMatch: IMatch[]) => {
  let gol = 0;
  homeMatch.forEach((match) => {
    gol += match.awayTeamGoals;
  });
  return gol;
};

const leaderboardTime = (team: Team, homeMatch: IMatch[]) => ({
  name: team.teamName,
  totalPoints: (victories(homeMatch) * 3) + draws(homeMatch),
  totalGames: homeMatch.length,
  totalVictories: victories(homeMatch),
  totalDraws: draws(homeMatch),
  totalLosses: losses(homeMatch),
  goalsFavor: goals(homeMatch),
  goalsOwn: goalsOnw(homeMatch),
  goalsBalance: goals(homeMatch) - goalsOnw(homeMatch),
  efficiency: Number(((((victories(homeMatch) * 3) + draws(homeMatch)) / (homeMatch
    .length * 3)) * 100).toFixed(2)),
});

export default leaderboardTime;
