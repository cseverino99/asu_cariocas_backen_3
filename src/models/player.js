const {
  Model,
} = require('sequelize');

module.exports = (sequelize) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      this.belongsTo(models.Game, {
        foreignKey: 'gameId',
      });
      // podria ser erroneo pq no esta creado aún
      this.hasOne(models.Table, {
        foreignKey: 'id',
      });
      this.hasOne(models.Mazo, {
        foreignKey: 'id',
      });
    }
  }
  Player.init({}, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};
