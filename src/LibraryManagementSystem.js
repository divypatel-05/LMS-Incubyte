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
        if (this.#availableBooks.length === 0) {
            console.log("Sorry, no books are available in the library.");
            return;
        }

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


    // Method to borrow a book by ISBN
    borrowBook(ISBN) {
        // console.log("Borrowed books are : ", this.#borrowedBooks.length);
        // console.log("Available Books are : ", this.#availableBooks.length);
        
        if (this.#borrowedBooks.length >= 3) {
            throw new Error("Trying to exceed the maximum limit of allowed borrowed books");
        }

        const bookIndex = this.#availableBooks.findIndex(book => book.ISBN === ISBN);

        if (bookIndex === -1) {
            throw new Error("Book is not present which you try to borrow");
        }

        // Remove the book from availableBooks and add it to borrowedBooks
        const [borrowedBook] = this.#availableBooks.splice(bookIndex, 1);
        this.#borrowedBooks.push(borrowedBook);
        console.log(`Book with ISBN ${ISBN} borrowed successfully!`);
    }

    // Method to return a book by ISBN
    returnBook(ISBN) {
        if (!ISBN || typeof ISBN !== 'string' || ISBN.length !== 16) {
            throw new Error("Trying to return a book which is not borrowed or doesn't exist.");
        }        

        const index = this.#borrowedBooks.findIndex(book => book.ISBN === ISBN);

        if (index === -1) {
            throw new Error("Trying to return Not borrowed book");
        }

        // Remove the book from borrowedBooks and add it to availableBooks
        const book = this.#borrowedBooks.splice(index, 1)[0];
        this.#availableBooks.push(book);
        console.log(`Book with ISBN ${ISBN} returned successfully!`);
    }
}

module.exports = LibraryManagementSystem;