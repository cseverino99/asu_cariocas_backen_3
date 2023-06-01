'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Creación de juegos
    await queryInterface.bulkInsert('Games', [
      {
        winner: 'Equipo A',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        winner: 'Equipo B',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Agrega aquí la lógica para revertir la inserción de juegos si es necesario
  }
};
