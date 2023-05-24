
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [
  {
    username: 'agustin',
    password: '12345678',
    mail: 'aurzuav@uc.cl',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  
  ]),
  down: (queryInterface) => queryInterface.bulkInsert('Users', null, {}) ,
  
};
