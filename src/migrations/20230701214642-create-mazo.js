/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Mazos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      mazo_central: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      mazo_basura: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      player_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1, // Establecer el valor predeterminado como 1
        references: {
          model: 'Players',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Mazos');
  },
};
