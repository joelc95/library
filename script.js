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
let libErrorMsg = document.getElementById('title-error-msg')
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

title.onchange = function() {
	isBookInLibrary()
}

submit.onclick = function(e) {
	addBookToLibrary(e);
	form.reset()
}

// Functions //

// Use form data to create Book object
const createNewBookObj = () => {
	const title = document.getElementById('title').value
	const author = document.getElementById('author').value
	const pages = document.getElementById('pages').value
	const read = document.getElementById('read').checked
	return new Book(title, author, pages, read)
}

// Check if title in input is already in Library
const isBookInLibrary = () => {
	for(let i = 0; i < myLibrary.length; i++) {
		if(myLibrary[i].title === title.value) {
			console.log(myLibrary[i].title + ' is in the lib')
			document.getElementById('title').style.border = 'red solid 1px'
			libErrorMsg.style.display = 'inline-block'
			return true
		} else {
			document.getElementById('title').style.border = 'none'
			libErrorMsg.style.display = 'none'
		}
	}
	return false
}

// Push new book to myLibrary
const addBookToLibrary = (e) => {
	e.preventDefault()
	let newBook = createNewBookObj();
	if(isBookInLibrary()) {
		console.log('error')
		return -1;
	}

	myLibrary.push(newBook)
	modal.style.display = "none"
	clearContainer();
	updateContainer();
	console.log(myLibrary)
	return;
}

// Create a html element for a book object
const createBookElement = (book) => {
	const container = document.createElement('div')
	const title = document.createElement('h3')
	const author = document.createElement('p')
	const pages = document.createElement('p')

	title.innerText = `${book.title}`
	author.innerText = `by ${book.author}`
	pages.innerText = `${book.pages} pages`

	container.appendChild(title)
	container.appendChild(author)
	container.appendChild(pages)

	container.classList.add('book-card')

	document.getElementById('books-container').appendChild(container)
}

// Reset book container to blank state
const clearContainer = () => {
	document.getElementById('books-container').innerHTML = ''
}

// Iterate thru lib, create book elements, and add them to container
const updateContainer = () => {
	for(let i = 0; i < myLibrary.length; i++) {
		createBookElement(myLibrary[i])
	}
}