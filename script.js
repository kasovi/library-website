class Book {
    constructor(name, author, pages, isRead) {
        Object.assign(this, { name, author, pages, isRead });
    }
}

class Library {
    constructor() {
        this.books = [];
    }
    addBook(book) {
         this.books.push(book);
    }
    removeBook(index) { 
        this.books.splice(index, 1); 
    }
    toggleReadStatus(index) { 
        this.books[index].isRead = !this.books[index].isRead; 
    }
}

const library = new Library();
const bookShelf = document.getElementById('bookShelf');
const dialog = document.getElementById('bookDialog');
const bookForm = document.getElementById('bookForm');

document.getElementById('addBookBtn').onclick = () => dialog.showModal();
document.getElementById('closeDialog').onclick = () => dialog.close();

bookForm.onsubmit = (e) => {
    e.preventDefault();
    
    const { bookName, bookAuthor, bookPages, isRead } = e.target.elements;
    library.addBook(new Book(bookName.value, bookAuthor.value, bookPages.value, isRead.value === 'yes'));
    updateBookShelf();
    
    dialog.close();
    bookForm.reset();
};

function updateBookShelf() {
    bookShelf.innerHTML = library.books.map((book, index) => `
        <div class="book">
            <h3>${book.name}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.isRead ? 'Read' : 'Unread'}</p>
            <button onclick="toggleReadStatus(${index})">Toggle Read Status</button>
            <button onclick="removeBook(${index})">Remove</button>
        </div>
    `).join('');
}

function toggleReadStatus(index) {
    library.toggleReadStatus(index);
    updateBookShelf();
}

function removeBook(index) {
    library.removeBook(index);
    updateBookShelf();
}

updateBookShelf();
