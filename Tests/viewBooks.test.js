const LibraryManagementSystem = require('../src/LibraryManagementSystem');

describe('LibraryManagementSystem - viewAvailableBooks Tests', () => {
    let lms;

    beforeEach(() => {
        lms = new LibraryManagementSystem(); // Initialize the library system before each test
    });

    // Test when no books are available
    test('viewAvailableBooksWhenNoBooksPresentTest', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        lms.viewAvailableBooks();
        expect(consoleSpy).toHaveBeenCalledWith("Sorry, no books are available in the library.");
        consoleSpy.mockRestore();
    });
});
