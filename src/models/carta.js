const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Carta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Mazo, {
        foreignKey: 'mazoId',
      });
    }
  }
  Carta.init({
    // mazoId: DataTypes.INTEGER,
    rank: DataTypes.STRING,
    suit: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Carta',
    tableName: 'Cartas',
  });
  return Carta;
};
