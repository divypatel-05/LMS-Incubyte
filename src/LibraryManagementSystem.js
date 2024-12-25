const Book = require('./Book');

class LibraryManagementSystem {
    #availableBooks = [];
    #borrowedBooks = [];

    getAvailableBooks() {
        return [...this.#availableBooks]; // Return a shallow copy to prevent direct modification
    }

    getBorrowedBooks() {
        return [...this.#borrowedBooks];
    }


    // Method to add a book to the library
    addBook(book) {

        this.#availableBooks.push(book);
        console.log(`Book with ISBN ${book.ISBN} added successfully!`);
    }


}

module.exports = LibraryManagementSystem;