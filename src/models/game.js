const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // users
      // games´
      // debería estar tablero acá también
      this.hasMany(models.Player, {
        foreignKey: 'id',
      });
      this.hasMany(models.User, {
        foreignKey: 'id',
      });
    }
  }
  Game.init({
    winnerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};
