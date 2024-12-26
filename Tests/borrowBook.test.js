const LibraryManagementSystem = require('../src/LibraryManagementSystem');

// Groups all tests related to the "borrowBooks"
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

    // Test to check user can borrow at max 2 books at a time
    test('borrowMaxTwoBooks', () => {
        const book1 = { title: "The Four Agreements", ISBN: "987-123-123-1118", author: "Don Miguel Ruiz", publicationYear: 1997 };
        const book2 = { title: "The Four Agreements", ISBN: "987-123-123-1119", author: "Don Miguel Ruiz", publicationYear: 1997 };
        const book3 = { title: "The Four Agreements", ISBN: "987-123-123-1117", author: "Don Miguel Ruiz", publicationYear: 1997 };

        lms.addBook(book1);
        lms.addBook(book2);
        lms.addBook(book3);

        lms.borrowBook("987-123-123-1118");
        lms.borrowBook("987-123-123-1119");

        // Assertions
        const borrowedBooks = lms.getBorrowedBooks();
        expect(borrowedBooks).toHaveLength(2);
        expect(borrowedBooks).toContainEqual(book1);
        expect(borrowedBooks).toContainEqual(book2);

        // Trying to borrow 3rd book, throws an error
        expect(() => lms.borrowBook("987-123-123-1117")).toThrow("Trying to exceed the maximum limit of allowed borrowed books");

        // Ensuring 3rd book is available, but can't borrow that
        const availableBooks = lms.getAvailableBooks();
        expect(availableBooks).toContainEqual(book3);
        expect(borrowedBooks).not.toContainEqual(book3);

    });
});


/*
expect : define what you expect the output or behavior of a function or code to be.
*/