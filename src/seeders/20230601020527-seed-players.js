/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Obtener los usuarios existentes
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM "Users";',
      { type: Sequelize.QueryTypes.SELECT },
    );

    // Obtener los juegos existentes
    const games = await queryInterface.sequelize.query(
      'SELECT id FROM "Games";',
      { type: Sequelize.QueryTypes.SELECT },
    );

    // Crear jugadores a partir de los usuarios existentes
    await queryInterface.bulkInsert('Players', [
      {
        userId: users[0].id,
        gameId: games[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: users[1].id,
        gameId: games[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: users[2].id,
        gameId: games[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: users[3].id,
        gameId: games[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Players', null, {});
  },
};
