/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // Creación de juegos
    // por chatgpt
    await queryInterface.bulkInsert('Games', [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        winnerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Games', null, {});
  },
};
