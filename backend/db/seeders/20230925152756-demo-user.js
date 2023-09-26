'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Users', [{
				name: 'Jerry',
				email: 'Jerry@example.com',
				image: 'https://fastly.picsum.photos/id/497/300/300.jpg?hmac=dtw7nGJRHPRmarbydsHN2XR_rN784bu4R-Wrfj3tY6E',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'George',
				email: 'george@example.com',
				image: 'https://fastly.picsum.photos/id/836/300/300.jpg?hmac=2JaWsj6WnMmhassbYyv4Mv74wp4PMkpTqllCk7Hlohk',
				createdAt: new Date(),
				updatedAt: new Date()
			}
		])
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users', null, {});
	}
};
