/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Obtener los jugadores existentes
    const players = await queryInterface.sequelize.query(
      'SELECT id FROM "Players";',
      { type: Sequelize.QueryTypes.SELECT },
    );
    // Crear mazos para cada jugador asignando un tablero aleatorio
    const currentDate = new Date();
    const mazos = players.map((player) => ({
      playerId: player.id,
      createdAt: currentDate,
      updatedAt: currentDate,
    }));

    await queryInterface.bulkInsert('Mazos', mazos);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Mazos', null, {});
  },
};
