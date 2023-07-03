/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    // Creación de usuarios
    // por chatgpt
    await queryInterface.bulkInsert('Users', [
      {
        username: 'usuario1',
        password: await bcrypt.hash('contraseña1', 10), // Hashear la contraseña con bcrypt
        mail: 'usuario1@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'usuario2',
        password: await bcrypt.hash('contraseña2', 10),
        mail: 'usuario2@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'usuario3',
        password: await bcrypt.hash('contraseña3', 10),
        mail: 'usuario3@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'usuario4',
        password: await bcrypt.hash('contraseña4', 10),
        mail: 'usuario4@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'admin',
        password: await bcrypt.hash('admin12345', 10),
        mail: 'admin@example.com',
        is_admin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
