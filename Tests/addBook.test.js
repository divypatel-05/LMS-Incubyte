const LibraryManagementSystem = require('../src/LibraryManagementSystem');
const Book = require('../src/Book');

describe('LibraryManagementSystem Tests', () => {
    let lms;
    let availableBooks;
    let borrowedBooks;

    // beforeEach: This hook runs before each test, resetting the lms and the lists of books
    beforeEach(() => {
        lms = new LibraryManagementSystem();
        availableBooks = lms.getAvailableBooks();
        borrowedBooks = lms.getBorrowedBooks();
    });


    // Test to check adding a valid book to the library
    test('addBookTest', () => {
        const book = { title: 'Ikigai', ISBN: '987-123-123-9876', author: 'Japanese Guy', publicationYear: 2000 };
        lms.addBook(book);
        const updatedAvailableBooks = lms.getAvailableBooks(); //Get the updated list
        expect(updatedAvailableBooks).toHaveLength(1);
        expect(updatedAvailableBooks).toContainEqual(book);
    });
});