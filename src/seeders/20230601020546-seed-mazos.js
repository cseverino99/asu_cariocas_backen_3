/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Obtener los jugadores existentes
    const players = await queryInterface.sequelize.query(
      'SELECT id FROM "Players";',
      { type: Sequelize.QueryTypes.SELECT },
    );

    const currentDate = new Date();
    const mazos = players.map((player) => {
      let mazo_central = false;
      let mazo_basura = false;

      if (player.id === 1) {
        mazo_central = true;
      } else if (player.id === 2) {
        mazo_basura = true;
      }

      return {
        player_id: player.id,
        createdAt: currentDate,
        updatedAt: currentDate,
        mazo_central,
        mazo_basura,
      };
    });

    await queryInterface.bulkInsert('Mazos', mazos);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Mazos', null, {});
  },
};
