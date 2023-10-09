// Import the shuffle function
const {shuffle} = require('../helpers/participantSheetItemHelper');

// Define a helper function to check if two arrays are equal
const arrayEqual = (a, b) => {
	return a.length === b.length && a.every((v, i) => v === b[i]);
};

// Write a test suite for the shuffle function
describe('shuffle', () => {
	// Test that the shuffle function returns an array of the same length as the input
	test('returns an array of the same length as the input', () => {
		// Define some input arrays
		const input1 = [1, 2, 3, 4, 5];
		const input2 = ['a', 'b', 'c', 'd', 'e'];
		const input3 = [];

		// Shuffle the input arrays
		const output1 = shuffle(input1);
		const output2 = shuffle(input2);
		const output3 = shuffle(input3);

		// Expect the output arrays to have the same length as the input arrays
		expect(output1.length).toBe(input1.length);
		expect(output2.length).toBe(input2.length);
		expect(output3.length).toBe(input3.length);
	});

	// Test that the shuffle function returns an array with the same elements as the input
	test('returns an array with the same elements as the input', () => {
		// Define some input arrays
		const input1 = [1, 2, 3, 4, 5];
		const input2 = ['a', 'b', 'c', 'd', 'e'];
		const input3 = [];

		// Shuffle the input arrays
		const output1 = shuffle(input1);
		const output2 = shuffle(input2);
		const output3 = shuffle(input3);

		// Expect the output arrays to have the same elements as the input arrays
		expect(output1.sort()).toEqual(input1.sort());
		expect(output2.sort()).toEqual(input2.sort());
		expect(output3.sort()).toEqual(input3.sort());
	});

	// Test that the shuffle function returns an array with a different order than the input
	test('returns an array with a different order than the input', () => {
		// Define some input arrays
		const input1 = [1, 2, 3, 4, 5];
		const input2 = ['a', 'b', 'c', 'd', 'e'];
		const input3 = [];

		// Shuffle the input arrays
		const output1 = shuffle(input1);
		const output2 = shuffle(input2);
		const output3 = shuffle(input3);

		// Expect the output arrays to have a different order than the input arrays
		expect(arrayEqual(output1, input1)).toBe(false);
		expect(arrayEqual(output2, input2)).toBe(false);
		expect(arrayEqual(output3, input3)).toBe(true); // Empty array is an exception
	});
});
