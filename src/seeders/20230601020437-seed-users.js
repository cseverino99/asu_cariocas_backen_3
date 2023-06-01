'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Creación de usuarios
    await queryInterface.bulkInsert('Users', [
      {
        username: 'usuario1',
        password: 'contraseña1',
        mail: 'usuario1@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'usuario2',
        password: 'contraseña2',
        mail: 'usuario2@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'usuario3',
        password: 'contraseña3',
        mail: 'usuario3@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'usuario4',
        password: 'contraseña4',
        mail: 'usuario4@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Agrega aquí la lógica para revertir la inserción de usuarios si es necesario
  }
};
