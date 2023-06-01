'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mazo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Player, {
        foreignKey: 'playerId',
      });
      this.hasMany(models.Carta, {
        foreignKey: 'id'
      });
      // define association here
    }
  }
  Mazo.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      // Resto de los atributos del modelo...
    },
    {
      sequelize,
      modelName: 'Mazo',
    }
  );
  return Mazo;
};