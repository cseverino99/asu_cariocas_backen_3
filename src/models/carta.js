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
    suit: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['pica', 'corazon', 'diamante', 'trebol']],
          msg: 'El valor de "suit" debe ser pica, corazon, diamante o trebol',
        },
      },
    },
    rank: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']],
          msg: 'El valor de "rank" debe ser A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q o K',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Carta',
    tableName: 'Cartas',
  });
  return Carta;
};
