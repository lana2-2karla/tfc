'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      homeTeam: {
        type: Sequelize.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'teams',
            key: 'id',
          },
          field: 'home_team',
      },
      homeTeamGoals: {
        type: Sequelize.Sequelize.INTEGER,
        field: 'home_team_goals',
      },
      awayTeam: {
        type: Sequelize.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'teams',
            key: 'id',
          },
          field: 'away_team',
      },
      awayTeamGoals: {
        type: Sequelize.Sequelize.INTEGER,
        allowNull: false,
        field: 'away_team_Goals',
      },
      inProgress: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'in_progress',
      }
     });
     
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};