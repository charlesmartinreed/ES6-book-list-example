// BOOK and UI are classes
class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

class UI {
	// methods
	addBookToList(book) {
		const list = document.querySelector('#book-list');
		const row = document.createElement('tr');

		row.innerHTML = `
		<td>${book.title}</td>
		<td>${book.author}</td>
		<td>${book.isbn}</td>
		<td><a href="#" class="delete">X</a></td>
		`
		list.appendChild(row);
	}

	showAlert(message, className) {
		//create the alert div
		const alertDiv = document.createElement('div');
		alertDiv.className = `alert ${className}`;
		alertDiv.appendChild(document.createTextNode(message));

		//get the parent element and the element to place the alert div above
		const parentContainer = document.querySelector('.container');
		const form = document.querySelector('#book-form');

		//insert the alert div into the DOM
		parentContainer.insertBefore(alertDiv, form);

		//remove the alert after 1.5s
		setTimeout(function(){
			document.querySelector('.alert').remove();
		},1500);

	}

	deleteBook(target) {
		//event propagation, event listener is placed on the parent
		if(target.className === 'delete') {
			target.parentElement.parentElement.remove(); //a -> td -> tr
		}

	}

	clearFields() {
		document.querySelector('#title').value = '';
		document.querySelector('#author').value = '';
		document.querySelector('#isbn').value = '';
	}
}

// STORAGE CLASS with static methods
class Store {
	// fetch books from local storage
	static getBooks() {
		let books;

		// check local storage
		if(localStorage.getItem('books') === null) {
			books = [];
		} else {
			books = JSON.parse(localStorage.getItem('books'));
		}

		return books;
	}

	// display the fetched books
	static displayBooks() {
		const books = Store.getBooks();
		const ui = new UI();
		books.forEach(function(book) {
			ui.addBookToList(book);
		});
	}

	// add a new book to local storage
	static addBook(book) {
		const books = Store.getBooks();
		books.push(book)
		localStorage.setItem('books', JSON.stringify(books));
	}

	// delete a book from local storage
	static removeBook(isbn) {
		const books = Store.getBooks();

		books.forEach(function(book, index){
			if(book.isbn === isbn) {
				books.splice(index, 1);
			}
		});

		localStorage.setItem('books', JSON.stringify(books));
	}
}

// EVENT LISTENERS
// event listener for showing books in library when page loads
document.addEventListener('DOMContentLoaded', function() {
	Store.displayBooks();
});

// submit event
document.querySelector('#book-form').addEventListener('submit', function(e){
	//grab the form field values
	const title = document.querySelector('#title').value,
				author = document.querySelector('#author').value,
				isbn = document.querySelector('#isbn').value

	//instantiate and build a book, add it to the ui
	const book = new Book(title, author, isbn);
	const ui = new UI();

	//form validation
	if(title === '' || author === '' || isbn === '') {
		ui.showAlert('Please complete all fields', 'error');
	} else {
		ui.addBookToList(book);
		Store.addBook(book);

		ui.showAlert(`${title} was added to the library!`, 'success');

		ui.clearFields();
	}

	e.preventDefault();
});

document.querySelector('#book-list').addEventListener('click', function(e){
	//event propagation, event listener is placed on the parent
	const ui = new UI();
	ui.deleteBook(e.target);

	//remove from localStorage
	// a -> td -> td containing isbn -> actual isbn number
	let isbn = e.target.parentElement.previousElementSibling.textContent;
	Store.removeBook(isbn);

	//show a deleted alert when complete
	// YES, I know this is an affirmative alert, but failure color works best for delete here and I'm too lazy to make another class just for this case so...
	ui.showAlert('Removed from library', 'failure');

	e.preventDefault();
});
