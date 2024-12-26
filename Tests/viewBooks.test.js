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

    // Test when atleast one book is available
    test('viewAvailableBooksTest', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

        // Add a single book
        lms.addBook({ title: "Ikigai", author: "Héctor García", ISBN: "8989-123-456-789", publicationYear: 2017 });

        lms.viewAvailableBooks();
        expect(consoleSpy).toHaveBeenCalledWith("Available Books are : \n");
        expect(consoleSpy).toHaveBeenCalledWith(
            "Title: Ikigai\n" +
            "Author: Héctor García\n" +
            "PublicationYear: 2017\n" +
            "ISBN: 8989-123-456-789\n"
        );
        consoleSpy.mockRestore();
    });
});
