/* Task Description */
/* 
	*	Create a module for working with books
		*	The module must provide the following functionalities:
			*	Add a new book to category
				*	Each book has unique title, author and ISBN
				*	It must return the newly created book with assigned ID
				*	If the category is missing, it must be automatically created
			*	List all books
				*	Books are sorted by ID
				*	This can be done by author, by category or all
			*	List all categories
				*	Categories are sorted by ID
		*	Each book/catagory has a unique identifier (ID) that is a number greater than or equal to 1
			*	When adding a book/category, the ID is generated automatically
		*	Add validation everywhere, where possible
			*	Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
			*	Author is any non-empty string
			*	Unique params are Book title and Book ISBN
			*	Book ISBN is an unique code that contains either 10 or 13 digits
			*	If something is not valid - throw Error
*/
function solve() {
	var library = (function () {
        var books = [];
        var categories = [];

		function listBooks(optional) {

			books.sort((a, b) => a.ID - b.ID);

			if (optional) {
				if (optional.category) {
					return books.filter(x => x.category == optional.category);
				}

				if (optional.author) {
					return books.filter(x => x.author === optional.author);
				}
			}
			return books;
		}

		function createId() {
			var id = 0;
			return function () {
				id += 1;
				return id;
			}
		}

		var idBook = createId();


		function addBook(book) {
			if (!book) {
				throw "Please provide a book to add!";
			} else if (!book.author) {
				throw "Book's author must be provided!";
			} else if (book.title.length < 2 || book.title.length > 100) {
				throw "Book's title must be between 2 and 100 symbols!"
			} else if (book.category.length < 2 || book.category.length > 100) {
				throw "Book's category must be between 2 and 100 symbols!"
			} else if (book.isbn.length !== 10 && book.isbn.length !== 13) {
				throw "ISBN must consist exactly 10 or 13 symbols! "
			} else if (books.map(b => b.isbn).some(b => b === book.isbn)) {
				throw "A book with the same ISBN already exists";
			} else if (books.map(b => b.title).some(b => b === book.title)) {
				throw "A book with the same title already exists";
			}

			book.ID = idBook();
			books.push(book);

			if (categories.indexOf(book.category) === -1) {
				categories.push(book.category);
			}

			return book;
		}

        function listCategories() {
            var sortedCategories = categories.sort((a, b) => a.ID - b.ID);
            return sortedCategories;
        }

        return {
            books: {
                list: listBooks,
                add: addBook
            },
            categories: {
                list: listCategories
            }
        };
    } ());

    return library;
}
module.exports = solve;
