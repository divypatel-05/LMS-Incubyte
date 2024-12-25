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

    // Test to check adding a book with an empty title, which should throw an error
    test('addBookWithEmptyTitleTest', () => {
        const book = { title: '', ISBN: '133-123-123-9875', author: 'James Clear', publicationYear: 2018 };
        expect(() => lms.addBook(book)).toThrow('Book title cannot be empty');
    });

    // Test to check adding a book with a null title, which should throw an error
    test('addBookWithNullTitleTest', () => {
        const book = { title: null, ISBN: '132-123-123-9875', author: 'James Clear', publicationYear: 2018 };
        expect(() => lms.addBook(book)).toThrow('Book title cannot be null!');
    });
});