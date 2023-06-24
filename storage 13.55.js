const STORAGE_KEY = 'Cattleya_Az-zahra';
let books = [];

const checkStorage = () => {
    if (typeof storage == undefined) {
        alert('Your Browser not suport web storage');
        return false;
    }

    return true;
};

const saveData = () => {
    const parseData = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parseData);
    document.dispatchEvent(new Event('ondatasaved'));
};

const loadDatafromStorage = () => {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    const data = JSON.parse(serializedData);

    if (data !== null) books = data;

    document.dispatchEvent(new Event('ondataloaded'));
};

const updateDataToStorage = () => {
    if (checkStorage()) saveData();
};

const composeBookObject = (bookTitle, bookAuthor, bookdate, completed) => {
    return{
        id:  +new Date(),
        bookTitle,
        bookAuthor,
        bookdate,
        completed,
    };
};

const findBook = (bookId) => {
    for (book of books) {
        if (book.id === bookId) return book;
    }

    return null;
};

const findBookIndex = (bookID) => {
    let index = 0;
    for (book of books) {
        if (book.id === bookId) return index;

        index++;
    }

    return -1;
};

const refreshDataFromBooks = () => {
    const bookUncompleted = document.getElementById(UNREAD_BOOK_ID);
    let BookComplated = document.getElementById(READ_BOOK_ID);

    for (book of books) {
        const newbook = makeBook(book.bookTitle, book.bookAuthor,book.bookdate, book.completed);
        newbook[BOOK_ITEMID] = book.id;

        if (book.Completed) {
            bookComplated.append(newBook);
        } else {
            bookUncompleted.append(newBook);
        }
    }
};