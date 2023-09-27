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
			},
			{
				name: 'Samuel Felton',
				email: 'sf.samfelton@icloud.com',
				image: 'https://avatars.githubusercontent.com/u/78095426?v=4',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'JohnDoe',
				email: 'johndoe@gmail.com',
				image: 'https://fastly.picsum.photos/id/369/200/200.jpg?hmac=mfma93Qqk_dWRARrDhIl7oid7sWebuZHhKQFsnMwwwE',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'JaneSmith',
				email: 'jane.smith@yahoo.com',
				image: 'https://fastly.picsum.photos/id/778/200/200.jpg?hmac=fgFK_HI_g_N4MzYuYbssOB8ymhT_m0JK61tNJHfdPYU',
				createdAt: new Date(),
				updatedAt: new Date()
			},
		])
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users', null, {});
	}
};
