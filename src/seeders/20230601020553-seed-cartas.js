'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Obtener el mazo existente
    const mazo = await queryInterface.sequelize.query(
      'SELECT id FROM "Mazos" LIMIT 1;',
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Crear cartas para el mazo
    const currentDate = new Date();
    const cartas = [
      {
        mazoId: mazo[0].id,
        rank: 'A',
        suit: 'Spades',
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        mazoId: mazo[0].id,
        rank: 'K',
        suit: 'Hearts',
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        mazoId: mazo[0].id,
        rank: 'Q',
        suit: 'Diamonds',
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        mazoId: mazo[0].id,
        rank: 'J',
        suit: 'Clubs',
        createdAt: currentDate,
        updatedAt: currentDate,
      },
    ];

    await queryInterface.bulkInsert('Cartas', cartas);
  },

  async down(queryInterface, Sequelize) {
    // Agrega aquí la lógica para revertir la inserción de cartas si es necesario
  },
};
