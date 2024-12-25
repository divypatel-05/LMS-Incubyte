class LibraryManagementSystem {
    #availableBooks = [];

    // Method to add a book to the library
    addBook(book) {
        this.#availableBooks.push(book);
        console.log(`Book with ISBN ${book.ISBN} added successfully!`);
    }
}
