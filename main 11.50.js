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

    const imageBook = document.createElement('div');
    imageBook.classList.add('image-book');
    imageBook.append(image);

    const bookTitle = document.createElement('h3');
    bookTitle.innerText = title;

    const bookAuthor = document.createElement('p');
    bookAuthor.innerText = author;

    const bookdate = document.createElement('small');
    bookdate.innerText = '${date}' ;

    const detail = document.createElement('div');
    detail.classList.add('detail-book');
    detail.append(bookTitle, bookAuthor, bookdate);

    const container = document.createElement('div');
    container.classList.add('my-container');
    container.append(imageBook, detail);

    if (Completed) {
        container.append(createUnreadButton(), createTrashButton());
    } else {
        container.append(createReadButton(), createTrashButton());
    }
    return container;
};

const createButton = (buttonTypeClass, evenListener) => {
    const butoon = document.createElement('button');
    button.classList.add(buttonTypeClass);

    button.addEventListener('click', function (event) {
        evenListener(event);
    });
    return butoon;
};

const createReadButton = () => {
    return createButton('read-button', function (event) {
        addBookToComplated(event.target.parentElement);
    });
};

const addBookToComplated = (BookElement) => {
    const BookComplated = Document.getElementById(READ_BOOK_ID);

    const bookTitle = BookElement.querySelector('.detail-book > h3').innerText;
    const bookAuthor = BookElement.querySelector('.detail-book > p').innerText;
    const bookdate = BookElement.querySelector('.detail-book > small').innerText;

    const newBook = makeBook(bookTitle, bookAuthor, bookdate, true);
    const book = findBook(BookElement[BOOK_ITEMID]);
    book.Complated = true;
    newBook[BOOK_ITEMID] = book.id;

    BookComplated.append(newBook);
    BookElement.remove();

    updateDataToStorage();
};

const removeBookFromCompleted = (BookElement) => {
    const bookPosition = findBookIndex(BookElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);
    BookElement.remove();
    updateDataToStorage();
};

const createTrashButton = () => {
    return createButton('trash-book', function (event) {
        removeBookFromCompleted(event.target.parentElement);
    });
};

const undoBookFromCompleted = (BookElement) => {
    const listUncompleted = document.getElementById(UNREAD_BOOK_ID);

    const bookTitle = BookElement.querySelector('.detail-book > h3').innerText;
    const bookAuthor = BookElement.querySelector('.detail-book > p').innerText;
    const bookdate = BookElement.querySelector('.detail-book > small').innerText;

    const newBook = makeBook(bookTitle, bookAuthor, bookdate, false);
    const book = findBook(BookElement[BOOK_ITEMID]);
    book.Complated = false;
    newBook[BOOK_ITEMID] = book.id;

    listUncompleted.append(newBook);
    BookElement.remove();
    undoBookFromCompleted();
};

const createUnreadButton = () => {
    return createButton('unread-button', function (event) {
        undoBookFromCompleted(Event.target.parentElement);
    });
};

const bookslength = () => {
    const jumplahBuku = document.getElementById('jumplahBuku');
    jumplahBuku.innerText = book.length;
};

addButton.addEventListener('click', () => {
    modal.classList.toggle('modal-open');
});

closeModal.addEventListener('click', () => {
    modal.style.transition = '1s';
    modal.classList.toggle('modal-open');
});

document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('form');
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        modal.classList.remove('modal-open');
        addBook();
    });

    if (checkStorage()) {
        loadDatafromStorage();
    }
});

document.addEventListener('ondatasaved', () => {
    console.log('Data berhasil disimpan.');
    bookslength();
});

document.addEventListener('ondataloaded', () => {
    refreshDataFromBooks();
    bookslength();
});