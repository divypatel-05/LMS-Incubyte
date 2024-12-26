const LibraryManagementSystem = require('../src/LibraryManagementSystem');

describe('LibraryManagementSystem - returnBooks Tests', () => {
    let lms;

    beforeEach(() => {
        lms = new LibraryManagementSystem();
    });

    // test to check returning of borrowed book
    test('returnBorrowedBook', () => {
        const book = { title: 'The Alchemist', ISBN: '8989-123-456-789', author: 'Paulo Coelho', publicationYear: 1988 };
        
        lms.addBook(book);
        lms.borrowBook('8989-123-456-789');
        lms.returnBook('8989-123-456-789');

        const availableBooks = lms.getAvailableBooks();
        const borrowedBooks = lms.getBorrowedBooks();

        // Assertions
        expect(borrowedBooks).not.toContainEqual(book); 
        expect(availableBooks).toContainEqual(book);
    });
});
