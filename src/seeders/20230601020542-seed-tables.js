module.exports = {
  // por chatgpt
  async up(queryInterface, Sequelize) {
    const playersQuery = 'SELECT id FROM "Players";';
    const gamesQuery = 'SELECT id FROM "Games";';

    const players = await queryInterface.sequelize.query(playersQuery, {
      type: Sequelize.QueryTypes.SELECT,
    });

    const games = await queryInterface.sequelize.query(gamesQuery, {
      type: Sequelize.QueryTypes.SELECT,
    });

    console.log('Players:', players);
    console.log('Games:', games);

    const currentDate = new Date();
    const tables = [];
    const playersLength = players.length;
    const gamesLength = games.length;

    for (let i = 0; i < playersLength; i += 1) {
      const player = players[i];
      // Utilizar el operador módulo para asignar los juegos en ciclo
      const game = games[i % gamesLength];

      const table = {
        playerId: player.id,
        gameId: game.id,
        createdAt: currentDate,
        updatedAt: currentDate,
      };

      tables.push(table);
    }

    await queryInterface.bulkInsert('Tables', tables);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Tables', null, {});
  },
};
