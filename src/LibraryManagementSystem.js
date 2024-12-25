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
        if (this.#validateTitle(book.title)) {
            this.#availableBooks.push(book);
            console.log(`Book with ISBN ${book.ISBN} added successfully!`);
        } else {
            throw new Error("Invalid book details. Please check the fields.");
        }
    }

    #validateTitle(title) {
        if (title === null) {
            throw new Error("Book title cannot be null!");
        } else if (title === "") {
            throw new Error("Book title cannot be empty");
        }
        return true;
    }

}

module.exports = LibraryManagementSystem;