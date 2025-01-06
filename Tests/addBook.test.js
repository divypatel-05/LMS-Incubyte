const LibraryManagementSystem = require('../src/LibraryManagementSystem');

// Groups all tests related to the "addBooks"
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

    // Test to check adding a book with null ISBN, which should throw an error
    test('addBookWithNullISBNTest', () => {
        const book = { title: 'Sapiens', ISBN: null, author: 'Yuval Noah Harari', publicationYear: 2011 };
        expect(() => lms.addBook(book)).toThrow('Cannot add a book having null ISBN');
    });

    // Test to check adding a book with lenght!=16, which should throw an error
    test('addBookWithImproperLengthISBNTest', () => {
        const book = { title: 'Sapiens', ISBN: '123', author: 'Yuval Noah Harari', publicationYear: 2011 };
        expect(() => lms.addBook(book)).toThrow('Cannot add book having length != 16');
    });

    // Test to check adding a book with duplicate ISBN, which should throw an error
    test('addBookWithDuplicateISBNTest', () => {
        const book1 = { title: 'Sapiens', ISBN: '987-123-123-9875', author: 'Yuval Noah Harari', publicationYear: 2011 };
        const book2 = { title: 'Thinking, Fast and Slow', ISBN: '987-123-123-9875', author: 'Daniel Kahneman', publicationYear: 2011 };
        lms.addBook(book1); // Adding the first book
        expect(() => lms.addBook(book2)).toThrow('Cannot add book with duplicate ISBN'); // Attempt to add the second book with the same ISBN
    });

    // Test to check ISBN should only contains numbers and hyphens
    test('ISBNContainsNumberAndHyphens', ()=> {
        const book1 = { title: 'Sapiens', ISBN: 'abc-123-123-9875', author: 'Yuval Noah Harari', publicationYear: 2011 };

        expect(() => lms.addBook(book1)).toThrow("ISBN should only contain numbers and hyphens");
    })
});



/*
expect : define what you expect the output or behavior of a function or code to be.
*/