const { Model } = require('sequelize');

module.exports = (sequelize) => {
  class Table extends Model {
    static associate(models) {
      this.belongsTo(models.Player, {
        foreignKey: 'playerId',
      });
      this.belongsTo(models.Game, {
        foreignKey: 'gameId',
      });
    }
  }

  Table.init({}, {
    sequelize,
    modelName: 'Table',
  });

  return Table;
};
