/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // Creación de usuarios
    // por chatgpt
    await queryInterface.bulkInsert('Users', [
      {
        username: 'usuario1',
        password: 'contraseña1',
        mail: 'usuario1@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'usuario2',
        password: 'contraseña2',
        mail: 'usuario2@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'usuario3',
        password: 'contraseña3',
        mail: 'usuario3@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'usuario4',
        password: 'contraseña4',
        mail: 'usuario4@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
