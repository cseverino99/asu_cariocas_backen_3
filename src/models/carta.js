'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Carta extends Model {
    static associate(models) {
      this.belongsTo(models.Mazo, {
        foreignKey: 'mazoId',
      });
    }
  }
  Carta.init(
    {
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
    },
    {
      sequelize,
      modelName: 'Carta',
      tableName: 'Cartas',
    }
  );
  return Carta;
};
