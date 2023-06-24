const modal = deocument.querySelector('#modal');
const addButton = document.getElementById('add-book');
const closeModal = document.getElementById('close');
const UNREAD_BOOK_ID = 'unread';
const READ_BOOK_ID = 'read';
const BOOK_ITEMID = 'itemId';

const addBook = () => {
    const uncomplatedBook = document.getElementById(UNREAD_BOOK_ID);
    const inputTitle = document.getElementById('title').value;
    const inputAuthor = document.getElementById('date').value;

    const book = makeBook(inputTitle, inputAuthor, inputdate, false);
    const bookObject = composeBookObject(inputTitle, inputAuthor, inputdate, false);

    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);

    uncomplatedBook.append(book);
    updateDataToStorage();
};

const makeBook = (title, author, date, Completed) => {
    const image = document.createElement('img');
    if (Complated) {
        image.setAttribute('src','1.jpg');
    } else {
        image.setAttribute('src','2.jpg');
    }
}