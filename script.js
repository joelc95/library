let myLibrary = [];

class Book {
	constructor(title="Unknown", author="Unknown", pages="Unknown", read=false) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}
}

// function addBookToLibrary(newBook) {
	
// }

let modal = document.getElementById('modal')

let btn = document.getElementById("book-btn")

let span = document.getElementsByClassName('close')[0]

btn.onclick = function() {
	modal.style.display = 'block'
}

window.onclick = function(e) {
	if (e.target == modal) {
		modal.style.display = "none"
	}
}