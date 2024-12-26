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

    // test to check returning of not borrowed book
    test('should throw an error when returning a book not borrowed', () => {
        const lms = new LibraryManagementSystem();
        const book = { title: 'Sapiens', ISBN: '6363-123-456-789', author: 'Yuval Noah Harari', publicationYear: 2011 };
    
        lms.addBook(book);
    
        // Attempt to return a book with an ISBN that is not in borrowedBooks
        expect(() => lms.returnBook('6363-987-654-321')).toThrow("Trying to return Not borrowed book");
    });
});
