// BOOK CONSTRUCTOR - creates a new book
function Book(title, author, isbn) {
	this.title = title;
	this.author = author;
	this.isbn = isbn;
}


// UI CONSTRUCTOR - set of prototype methods for updating the UI
function UI() {}

// PROTOTYPE METHODS
UI.prototype.addBookToList = function(book){
	const list = document.getElementById('book-list');

	//create a tr element
	const row = document.createElement('tr');
	//insert the cols
	row.innerHTML = `
	<td>${book.title}</td>
	<td>${book.author}</td>
	<td><a href="#" class="delete">X</a></td>
	`
	list.appendChild(row);
}

UI.prototype.clearFields = function() {
	// let inputs = Array.from(document.getElementById('book-form').children);
	// inputs.forEach(function(input){
	// 	console.log('got one');
	// });
	document.getElementById('title').value = '';
	document.getElementById('author').value = '';
	document.getElementById('isbn').value = '';
}

// CREATE EVENT LISTENERS
document.getElementById('book-form').addEventListener('submit', function(e){
	//grab the form field values
	const title = document.getElementById('title').value,
				author = document.getElementById('author').value,
				isbn = document.getElementById('isbn').value

		//instantiate a new book
		const book = new Book(title, author, isbn);

		//instantiate the UI
		const ui = new UI();

		//Add book to the list
		ui.addBookToList(book);

		//clear the fields
		ui.clearFields();

	e.preventDefault(isbn);
})
