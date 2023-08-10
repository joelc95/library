// Data structures

let myLibrary = [];

class Book {
	constructor(title="Unknown", author="Unknown", pages="Unknown", read=false) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}
}

// UI Elements

let modal = document.getElementById("modal")
let modalContent = document.getElementById("modal-content")
let modalClose = document.getElementsByClassName("close")[0]
let newBookButton = document.getElementById("book-btn")
let submit = document.getElementById("submit-btn")
let form = document.getElementById("modal-form")

newBookButton.onclick = function() {
	modal.style.display = 'block'
}

modalClose.onclick = function(e) {
	modal.style.display = "none"
}

window.onclick = function(e) {
	if (e.target == modal) {
		modal.style.display = "none"
	}
}

// Use form data to create Book object
const createNewBookObj = () => {
	const title = document.getElementById('title').value
	const author = document.getElementById('author').value
	const pages = document.getElementById('pages').value
	const read = document.getElementById('read').checked
	return new Book(title, author, pages, read)
}

const addBookToLibrary = (e) => {
	e.preventDefault()
	let newBook = createNewBookObj();

	for(let i = 0; i < myLibrary.length; i++) {
		if(myLibrary[i].title === newBook.title) {
			console.log("this book is already in your library")
			console.log(myLibrary)
			return;
		}
	}
	myLibrary.push(newBook)
	console.log(myLibrary)
	return;
}

submit.onclick = function(e) {
	addBookToLibrary(e);
	form.reset()
}