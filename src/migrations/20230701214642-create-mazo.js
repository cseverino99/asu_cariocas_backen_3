'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Mazos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mazo_central: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      mazo_basura: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      player_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Players',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Mazos');
  }
};
