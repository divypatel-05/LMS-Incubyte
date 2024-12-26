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
        if (
            this.#validateTitle(book.title) &&
            this.#validateAuthor(book.author) &&
            this.#validatePublicationYear(book.publicationYear) &&
            this.#validateISBN(book.ISBN)

        ) {
            this.#availableBooks.push(book);
            console.log(`Book with ISBN ${book.ISBN} added successfully!`);
        } else {
            throw new Error("Invalid book details. Please check the fields.");
        }
    }

    // Private method to Check if the title is null or an empty string, throws an error
    #validateTitle(title) {
        if (title === null) {
            throw new Error("Book title cannot be null!");
        } else if (title === "") {
            throw new Error("Book title cannot be empty");
        }
        return true;
    }

    // Private method to Check if the Author name is null or an empty string, throws an error
    #validateAuthor(author) {
        if (author === null) {
            throw new Error("Book Author cannot be null!");
        } else if (author === "") {
            throw new Error("Book Author name cannot be empty!");
        }
        return true;
    }

    // Private method to Check if the Publication year is negative or in future, throws an error
    #validatePublicationYear(year) {
        const currentYear = new Date().getFullYear();
        if (year > currentYear) {
            throw new Error(`Publication year must be between the range of 1 to ${currentYear}`);
        } else if (year < 1) {
            throw new Error("Cannot add a book having publication year < 1");
        }
        return true;
    }

    // Private method to Check validity of ISBN (null, length, duplication), throws an error
    #validateISBN(ISBN) {
        if (ISBN === null) {
            throw new Error("Cannot add a book having null ISBN");
        } else if (ISBN.length !== 16) {
            throw new Error("Cannot add book having length != 16");
        }

        for (let book of this.#availableBooks) {
            if (book.ISBN === ISBN) {
                throw new Error("Cannot add book with duplicate ISBN");
            }
        }
        return true;
    }


    // Method to view available books
    viewAvailableBooks() {
        console.log("Available Books are : \n");
        this.#availableBooks.forEach(book => {
            console.log(
                `Title: ${book.title}\n` +
                `Author: ${book.author}\n` +
                `PublicationYear: ${book.publicationYear}\n` +
                `ISBN: ${book.ISBN}\n`
            );
        });
    }
}

module.exports = LibraryManagementSystem;