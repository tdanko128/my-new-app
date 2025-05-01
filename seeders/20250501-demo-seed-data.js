'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      { name: 'Parent One', email: 'parent1@example.com', role: 'admin', settings: '{}', points: 0, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Parent Two', email: 'parent2@example.com', role: 'admin', settings: '{}', points: 0, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Child One', email: 'child1@example.com', role: 'child', settings: '{}', points: 10, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Child Two', email: 'child2@example.com', role: 'child', settings: '{}', points: 5, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Child Three', email: 'child3@example.com', role: 'child', settings: '{}', points: 0, createdAt: new Date(), updatedAt: new Date() }
    ], {});

    await queryInterface.bulkInsert('Chores', [
      { title: 'Take out trash', description: 'Take trash to the curb', frequency: 'daily', pointValue: 5, assignedTo: 3, isComplete: false, dueDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { title: 'Clean your room', description: 'Tidy and vacuum the room', frequency: 'weekly', pointValue: 10, assignedTo: 4, isComplete: false, dueDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { title: 'Feed the dog', description: 'Morning and night feeding', frequency: 'daily', pointValue: 3, assignedTo: 5, isComplete: false, dueDate: new Date(), createdAt: new Date(), updatedAt: new Date() }
    ], {});

    await queryInterface.bulkInsert('Rewards', [
      { name: 'Ice Cream Trip', description: 'Go out for ice cream', cost: 15, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Movie Night', description: 'Pick a movie and snacks', cost: 20, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Chores', null, {});
    await queryInterface.bulkDelete('Rewards', null, {});
  }
};
