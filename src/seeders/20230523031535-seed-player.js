module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Players', [
  {
    name: 'agustin',
    userId: 1,
    gameId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  
  ]),
  down: (queryInterface) => queryInterface.bulkInsert('Players', null, {}) ,
  
};
