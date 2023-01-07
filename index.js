let MyLibrary = [
  { title: 'Great', author: 'Mercy', pages: 23, isRead: 'Read' },
];
const bookTable = document.getElementById('table');
const displayNumber = document.getElementById('displayNumber');
const addBookButton = document.getElementById('add-book');

const inputForm = document.getElementById('input-form');
let bookKeys = ['No', 'Title', 'Author', 'Pages', 'Status', '', ''];

inputForm.style.display = 'none';

function Book(book) {
  // Book object constructor
  this.title = book.title;
  this.author = book.author;
  this.pages = book.pages;
  this.isRead = book.isRead === 'on' ? 'Read' : 'Not Read';
}

function addBookToLibrary(form) {
  const bookData = Object.fromEntries(new FormData(form));

  const newBook = new Book(bookData);
  MyLibrary.push(newBook);
  form.reset();
}

function createTableHead(table, tableHeaders) {
  // let bookProps = Object.keys(books[0]);
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let header of tableHeaders) {
    let th = document.createElement('th');
    let text = document.createTextNode(header);
    th.appendChild(text);
    row.appendChild(th);
  }
}
function displayBooks(table, books) {
  // clear table data
  table.innerHTML = '';

  // create table headers first
  createTableHead(bookTable, bookKeys);

  // generate table
  books.forEach((book, index) => {
    let body = table.createTBody();
    let row = body.insertRow();
    let number = document.createTextNode(index + 1);
    row.insertCell().appendChild(number);
    for (let key in book) {
      let text = document.createTextNode(book[key]);
      row.insertCell().appendChild(text);
    }
    row.insertCell().innerHTML = `<i data-index=${index} class="fa-solid fa-pen edit-book"></i>`;
    row.insertCell().innerHTML = `<i data-index=${index} class="fa-solid fa-trash del-book" ></i>`;
  });

  // for (let book of books) {
  //   let row = table.insertRow();
  //   for (let key in book) {
  //     let cell = row.insertCell();
  //     let text = document.createTextNode(book[key]);
  //     cell.appendChild()
  //     cell.appendChild(text);
  //   }
  // }
}
function editBookInLibrary(bookIndex) {
  const book = MyLibrary[bookIndex];
  inputForm.querySelectorAll('[data-input=""]').forEach((input) => {
    for (let key in book) {
      if (key === input.name) {
        if (key === 'isRead') {
          book[key] === 'Read'
            ? input.setAttribute('checked', '')
            : input.setAttribute('a', '');
        } else {
          input.value = book[key];
        }
      }
    }
  });
  MyLibrary.splice(bookIndex, 1);
  inputForm.style.display = 'block';
}
function removeBookToLibrary(bookIndex) {
  MyLibrary.splice(bookIndex, 1);
}

inputForm.addEventListener('submit', function (e) {
  e.preventDefault();
  addBookToLibrary(e.target);
  displayBooks(bookTable, MyLibrary);
  addListeners();
  displayNumber.innerHTML = `You have ${MyLibrary.length} books in Your Library`;
  inputForm.style.display = 'none';
  inputForm.querySelector('input[type="checkbox"]').removeAttribute('checked');
});

const updateNumberOfBooks = (bookArray) => {
  displayNumber.innerHTML = `You have ${bookArray.length} books in Your Library`;
};

addBookButton.addEventListener('click', function () {
  inputForm.style.display = 'block';
});

const addListeners = () => {
  const editBookButton = document.querySelectorAll('.edit-book');
  const delBookButton = document.querySelectorAll('.del-book');

  delBookButton.forEach((delButton) => {
    delButton.addEventListener('click', function () {
      const bookIndex = delButton.dataset.index;
      removeBookToLibrary(bookIndex);
      displayBooks(bookTable, MyLibrary);
      addListeners();
      updateNumberOfBooks(MyLibrary);
    });
  });

  editBookButton.forEach((editButton) => {
    editButton.addEventListener('click', function () {
      const bookIndex = editButton.dataset.index;
      editBookInLibrary(bookIndex);
      addListeners();
    });
  });
};

//
updateNumberOfBooks(MyLibrary);

if (MyLibrary.length > 0) {
  displayBooks(bookTable, MyLibrary);
  addListeners();
}
