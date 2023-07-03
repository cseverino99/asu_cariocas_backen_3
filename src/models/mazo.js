const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Mazo extends Model {
    static associate(models) {
      this.belongsTo(models.Player, {
        foreignKey: 'player_id',
      });
      this.hasMany(models.Carta, {
        foreignKey: 'id',
      });
    }
  }
  Mazo.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      // Resto de los atributos del modelo...
    },
    {
      sequelize,
      modelName: 'Mazo',
    },
  );
  return Mazo;
};
