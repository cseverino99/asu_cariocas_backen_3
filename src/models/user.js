const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Player, {
        foreignKey: 'id',
      });
      // define association here
    }
  }
  User.init({
    // validaciones
    username: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: {
          msg: 'Username must be alphanumeric',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        // chat gpt
        isValidPassword(value) {
          const hasLetter = /[a-zA-Z]/.test(value); // Comprueba si hay al menos una letra
          const hasNumber = /[0-9]/.test(value); // Comprueba si hay al menos un número
          const hasValidLength = value.length >= 8; // Comprueba si la longitud es mayor o igual a 8
          if (!(hasLetter && hasNumber && hasValidLength)) {
            throw new Error('Password must have a letter, a number and al least 8 characters');
          }
        },
      //--
      },
    },
    mail: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'mail must have email format',
        },
      },
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
