module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Tables', [
  {
    playerId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  
  ]),
  down: (queryInterface) => queryInterface.bulkInsert('Tables', null, {}) ,
  
};
