import { Model, DataTypes } from 'sequelize';
import db from '.';
import Team from './teams';

class Match extends Model {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: number;
}

Match.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'Match',
  tableName: 'matches',
  timestamps: false });

Match.belongsTo(Team, {
  foreignKey: 'homeTeam',
  as: 'teams',
});

Team.hasMany(Match, {
  foreignKey: 'homeTeam',
  as: 'matches',
});

Match.belongsTo(Team, {
  foreignKey: 'awayTeam',
  as: 'teams',
});

Team.hasMany(Match, {
  foreignKey: 'awayTeam',
  as: 'matches',
});

export default Match;
