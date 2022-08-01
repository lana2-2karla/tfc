import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Team extends Model {
  id: number;
  teamsName: string;
}

Team.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'team',
  timestamps: false,
  underscored: true });

export default Team;
