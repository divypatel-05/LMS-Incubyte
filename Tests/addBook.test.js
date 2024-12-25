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

    // Test to ensure adding a book with an empty author throws an error
    test('addBookWithEmptyAuthorTest', () => {
        const book = { title: 'Atomic Habits', ISBN: '134-123-123-9875', author: '', publicationYear: 2018 };
        expect(() => lms.addBook(book)).toThrow('Book Author name cannot be empty!');
    });

    // Test to ensure adding a book with a null author throws an error
    test('addBookWithNullAuthorTest', () => {
        const book = { title: 'Atomic Habits', ISBN: '135-123-123-9875', author: null, publicationYear: 2018 };
        expect(() => lms.addBook(book)).toThrow('Book Author cannot be null!');
    });

    // Test to check adding a book with a negative or future publication year, which should throw an error
    test('addBookWithInvalidPublicationYearTest', () => {
        const currentYear = new Date().getFullYear();
        const book = { title: 'The Alchemist', ISBN: '136-123-123-9875', author: 'Paulo Coelho', publicationYear: 2030 };
        expect(() => lms.addBook(book)).toThrow(`Publication year must be between the range of 1 to ${currentYear}`);
    });
});