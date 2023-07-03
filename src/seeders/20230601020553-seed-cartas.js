/* eslint-disable no-restricted-syntax */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear el mazo central
    await queryInterface.bulkInsert('Mazos', [{ mazo_central: true, mazo_basura: false }]);

    // Obtener el mazo central existente
    const mazo = await queryInterface.sequelize.query(
      'SELECT id FROM "Mazos" WHERE mazo_central = true LIMIT 1;',
      { type: Sequelize.QueryTypes.SELECT },
    );

    // Crear las 52 cartas para el mazo central
    const currentDate = new Date();
    const cartas = [];
    const ranks = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];
    const suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];

    for (const suit of suits) {
      for (const rank of ranks) {
        const imagen = `https://raw.githubusercontent.com/hayeah/playing-cards-assets/master/png/${rank.toLowerCase()}_of_${suit.toLowerCase()}.png`;
        const carta = {
          mazo_id: mazo[0].id,
          rank,
          suit,
          imagen,
          createdAt: currentDate,
          updatedAt: currentDate,
        };
        cartas.push(carta);
      }
    }

    await queryInterface.bulkInsert('Cartas', cartas);
  },

  async down(queryInterface) {
    // Eliminar las cartas del mazo central
    await queryInterface.bulkDelete('Cartas', { mazo_central: true });

    // Eliminar el mazo central
    await queryInterface.bulkDelete('Mazos', { mazo_central: true });
  },
};
