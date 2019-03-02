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
	<td>${book.isbn}</td>
	<td><a href="#" class="delete">X</a></td>
	`
	list.appendChild(row);
}

UI.prototype.showAlert = function(message, className) {
	//create the div, add the proper classes, a
	const div = document.createElement('div')
	div.className = `alert ${className}`
	div.appendChild(document.createTextNode(message));

	//get the parent element, grab the element to place the alert before, insert the div as a child on the parent
	const container = document.querySelector('.container');
	const form = document.querySelector('#book-form');

	container.insertBefore(div, form); //insert alert div before form

	//disappear after 1.5 seconds
	setTimeout(function(){
		document.querySelector('.alert').remove();
	}, 1500)
}

UI.prototype.clearFields = function() {
	document.getElementById('title').value = '';
	document.getElementById('author').value = '';
	document.getElementById('isbn').value = '';
}

// DELETE BOOK METHOD
UI.prototype.deleteBook = function(target) {
	if(target.className === 'delete') {
		target.parentElement.parentElement.remove(); //a -> td -> tr
	}
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

		// Validate input
		if(title === '' || author === '' || isbn === ''){
			//create an error alert
			ui.showAlert('Please fill in all fields', 'error');
		} else {
			//Add book to the list
			ui.addBookToList(book);
			ui.showAlert(`${title} was added to your library!`, 'success');

			//clear the fields
			ui.clearFields();
		}

	e.preventDefault();
});

// EVENT LISTENER FOR REMOVING ITEM FROM FORM - USES EVENT DELEGATION
// added to the td element
document.getElementById('book-list').addEventListener('click', function(e){

	//instantiate the UI
	const ui = new UI();

	ui.deleteBook(e.target);

	//after deleting, showAlert
	ui.showAlert('Book removed!', 'success');

	e.preventDefault();
});
