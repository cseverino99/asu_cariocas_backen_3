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
        name: 'Jugador 1',
        userId: users[0].id,
        gameId: games[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jugador 2',
        userId: users[1].id,
        gameId: games[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jugador 3',
        userId: users[2].id,
        gameId: games[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jugador 4',
        userId: users[3].id,
        gameId: games[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  // async down(queryInterface, Sequelize) {
  //   // Agrega aquí la lógica para revertir la inserción de jugadores si es necesario
  // },
};
