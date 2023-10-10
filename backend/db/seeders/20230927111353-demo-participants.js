"use strict";

const { User, Sheet, Participant } = require("../models");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const friday_night_bingo = await Sheet.findOne({
			where: {
				name: "Friday Night Bingo",
			},
		});

		console.log("*");
		console.log("*");
		console.log("*");
		console.log("*");
		console.log("*");
		console.log("*");
		console.log(friday_night_bingo);

		const sunday_funday_bingo = await Sheet.findOne({
			where: {
				name: "Sunday Funday Bingo",
			},
		});

		const john_doe = await User.findOne({ where: { name: "JohnDoe" } });
		const jane_smith = await User.findOne({ where: { name: "JaneSmith" } });
		const sam_felton = await User.findOne({
			where: { name: "Samuel Felton" },
		});

		console.log(john_doe);
		console.log(jane_smith);
		console.log(sam_felton);

		console.log(john_doe.id);
		console.log(sam_felton.id);
		console.log(jane_smith.id);

		const participant_friday_1 = await Participant.create({
			isOwner: true,
			createdAt: new Date(),
			updatedAt: new Date(),
			SheetId: friday_night_bingo.id,
			UserId: john_doe.id,
		});

		const participant_friday_2 = await Participant.create({
			isOwner: false,
			createdAt: new Date(),
			updatedAt: new Date(),
			SheetId: friday_night_bingo.id,
			UserId: jane_smith.id,
		});

		const participant_friday_3 = await Participant.create({
			isOwner: false,
			createdAt: new Date(),
			updatedAt: new Date(),
			SheetId: friday_night_bingo.id,
			UserId: sam_felton.id,
		});

		const participant_sunday_1 = await Participant.create({
			isOwner: true,
			createdAt: new Date(),
			updatedAt: new Date(),
			SheetId: sunday_funday_bingo.id,
			UserId: sam_felton.id,
		});

		const participant_sunday_2 = await Participant.create({
			isOwner: false,
			createdAt: new Date(),
			updatedAt: new Date(),
			SheetId: sunday_funday_bingo.id,
			UserId: jane_smith.id,
		});

		console.log(participant_sunday_2);
	},

	down: async (queryInterface, Sequelize) => {
		console.log("deleting participants");
		await queryInterface.bulkDelete("Participants", null, {});
	},
};
