'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Obtener los jugadores existentes
    const players = await queryInterface.sequelize.query(
      'SELECT id FROM "Players";',
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Obtener los tableros existentes
    const tables = await queryInterface.sequelize.query(
      'SELECT id FROM "Tables";',
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Crear mazos para cada jugador asignando un tablero aleatorio
    const currentDate = new Date();
    const mazos = players.map((player) => {
      const randomTable = tables[Math.floor(Math.random() * tables.length)]; // Obtener un tablero aleatorio

      return {
        playerId: player.id,
        boardId: randomTable.id, // Asignar el ID del tablero aleatorio a la columna "boardId"
        createdAt: currentDate,
        updatedAt: currentDate,
      };
    });

    await queryInterface.bulkInsert('Mazos', mazos);
  },

  async down(queryInterface, Sequelize) {
    // Agrega aquí la lógica para revertir la inserción de mazos si es necesario
  },
};
