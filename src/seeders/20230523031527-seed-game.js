module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Games', [
  {
    winner: 'agustin',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  
  ]),
  down: (queryInterface) => queryInterface.bulkInsert('Games', null, {}) ,
  
};