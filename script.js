// Data structures

let myLibrary = [];

class Book {
	constructor(title="Unknown", author="Unknown", pages="Unknown", read=false) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}

	updateReadState() {
		this.read = !this.read
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
let readCheckbox = document.getElementsByClassName('read-check')

readCheckbox.onclick = function(e) {
	console.log(e.target.parentNode)
	console.log('hello')
	e.target.updateReadState()
}

newBookButton.onclick = function() {
	modal.style.display = 'block'
}

// modalClose.onclick = function(e) {
// 	modal.style.display = "none"
// }

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
	// Prevent page refresh
	e.preventDefault()
	let newBook = createNewBookObj();
	if(isBookInLibrary()) {
		console.log('error')
		return -1;
	}
	// Push book to lib
	myLibrary.push(newBook)
	// Hide modal
	modal.style.display = "none"
	// Clear book container
	clearContainer();
	// Add books from lib
	updateContainer();
	
	return;
}

// Create a html element for a book object
const createBookElement = (book) => {
	const container = document.createElement('div')
	const title = document.createElement('h3')
	const author = document.createElement('p')
	const pages = document.createElement('p')
	const readContainer = document.createElement('div')
	const readText = document.createElement('p')
	const readCheck = document.createElement('input')
	const pgbreak = document.createElement('br')
	readCheck.setAttribute('type', 'checkbox')

	title.innerText = `${book.title}`
	book.author !== '' ? author.innerText = `by ${book.author}` : author.innerText = 'Author: unknown'
	book.pages !== '' ? pages.innerText = `${book.pages} pages` : pages.innerText = 'Pages: unknown'
	readText.innerText = "read? "
	book.read && readCheck.setAttribute('checked', true)

	container.appendChild(title)
	container.appendChild(author)
	container.appendChild(pages)
	container.appendChild(pgbreak)
	readContainer.appendChild(readText)
	readContainer.appendChild(readCheck)
	container.appendChild(readContainer)

	container.classList.add('book-card')
	readContainer.classList.add('read-info')
	readCheck.classList.add('read-check')
	readCheck.onclick = function(e) {
		console.log(myLibrary)
		for(let i = 0; i < myLibrary.length; i++) {
			if(myLibrary[i].title === e.target.parentNode.parentNode.firstChild.innerHTML) {
				myLibrary[i].updateReadState()
			}
		}
	}

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
