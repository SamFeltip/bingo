const {ParticipantSheetItem, SheetItem, Sequelize} = require("../db/models");

// source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffle = (array) => {
	let array_copy = [...array]
	let currentIndex = array.length, randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex > 0) {

		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		let temp = array_copy[randomIndex]
		array_copy[randomIndex] = array_copy[currentIndex]
		array_copy[currentIndex] = temp

		// [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array_copy;
}

const createNewParticipantSheetItems = async (participant_id, sheet_items) => {

	let shuffled_positions = shuffle(sheet_items.map((_, index) => index))

	console.log(shuffled_positions)

	let participant_sheet_item_data = shuffled_positions.map((position, index) => (
		{
			SheetItemId: sheet_items[index].id,
			ParticipantId: participant_id,
			position,
			checked: false
		}
	))

	let participant_sheet_items = await ParticipantSheetItem.bulkCreate(
		participant_sheet_item_data, {returning: true}
	)

	let participant_sheet_items_ids = participant_sheet_items.map(psi => psi.id)

	return ParticipantSheetItem.findAll({
		where: {
			id: {
				[Sequelize.Op.in]: participant_sheet_items_ids
			}
		},
		include: {
			model: SheetItem,
			attributes: ["text"]
		},
		attributes: ["checked", "position", "id"],
		order: [['position', 'ASC']]

	})
}

module.exports = {
	createNewParticipantSheetItems, shuffle
}