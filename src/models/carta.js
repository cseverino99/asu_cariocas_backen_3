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
    rank: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']],
      },
    },
    suit: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['Spades', 'Hearts', 'Diamonds', 'Clubs']],
      },
    },
  }, {
    sequelize,
    modelName: 'Carta',
    tableName: 'Cartas',
  });
  return Carta;
};
