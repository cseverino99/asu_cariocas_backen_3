/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cartas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      // Resto de los atributos del modelo...
      mazo_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1, // Establecer el valor predeterminado como 1
        references: {
          model: 'Mazos',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      imagen: {
        allowNull: true, // O false si la imagen es obligatoria
        type: Sequelize.STRING, // O el tipo de datos adecuado para almacenar la URL de la imagen
      },
      rank: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      suit: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Actualizar el valor "mazo_id" de todas las cartas creadas
    await queryInterface.sequelize.query(
      'UPDATE "Cartas" SET mazo_id = 1;',
    );
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Cartas');
  },
};
