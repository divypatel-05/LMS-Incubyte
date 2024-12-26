const LibraryManagementSystem = require('../src/LibraryManagementSystem');

describe('LibraryManagementSystem - borrowBook Tests', () => {
    let lms;

    beforeEach(() => {
        lms = new LibraryManagementSystem();
    });

    // test to borrow book when book is already present in library
    test('borrowAvailableBookTest', () => {
        const book = {
            title: "The Power of Habit",
            ISBN: "987-123-123-9876",
            author: "Charles Duhigg",
            publicationYear: 2012
        };

        lms.addBook(book);
        lms.borrowBook("987-123-123-9876");

        const availableBooks = lms.getAvailableBooks();
        const borrowedBooks = lms.getBorrowedBooks();

        // Assertions
        expect(availableBooks).toHaveLength(0); 
        expect(borrowedBooks).toHaveLength(1); 
        expect(borrowedBooks).toContainEqual(book); 
        expect(availableBooks).not.toContainEqual(book);
    });


    // test to borrow book when book is not present in library
    test('borrowUnavailableBookTest', () => {
        const book = {
            title: "The Subtle Art of Not Giving a F*ck",
            ISBN: "987-123-123-9811",
            author: "Mark Manson",
            publicationYear: 2016
        };
        lms.addBook(book);

        expect(() => lms.borrowBook("654-987-987-9812")).toThrow("Book is not present which you try to borrow");

        const availableBooks = lms.getAvailableBooks();
        const borrowedBooks = lms.getBorrowedBooks();

        // Assertions
        expect(availableBooks).toHaveLength(1); 
        expect(borrowedBooks).toHaveLength(0);
    });

});
