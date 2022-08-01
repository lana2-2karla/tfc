'use.strict'

module.exports = {
    up: async (QueryInterface, Sequelize) => {
        await QueryInterface.createTable('teams', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
              },
              teamName: {
                type: Sequelize.STRING(255),
                allowNull: false,
                field: 'team_name'
              }
        })
    },
    down: async (queryInterface, _Sequelize) => {
      await queryInterface.dropTable('teams');
    }
}