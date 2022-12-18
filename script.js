let myLibrary = [{title: 'Harry Potter', author: 'J.K. Rowling', pages: 480, isRead: 'not read'}, {title: 'Chemist', author: 'Koala Poilo', pages: 262, isRead: 'read'}];

/* =================== DISPLAY BOOKS OFF THE START ==================== */
window.addEventListener('DOMContentLoaded', () => displayBook());

/* ========================== DISPLAY BOOKS =========================== */
const table = document.querySelector('tbody');

function displayBook() {
myLibrary.forEach((book) => {
    let tRow = document.createElement('tr');
    let tD1 = document.createElement('td');
    let tD2 = document.createElement('td');
    let tD3 = document.createElement('td');
    let tD4 = document.createElement('td');
    let tD5 = document.createElement('td');

    tD1.innerText = book.title;
    tD2.innerText = book.author;
    // tD3.innerText = book.pages;
    tD4.innerHTML = `<div class='status'>${book.isRead}</div>`;
    tD5.innerHTML = "<div class='remove'>Remove</div>";

    tRow.appendChild(tD1);
    tRow.appendChild(tD2);
    // tRow.appendChild(tD3);
    tRow.appendChild(tD4);
    tRow.appendChild(tD5);
    table.appendChild(tRow);
    })
}

/* ======================= CONSTRUCTOR FUNCTION ======================= */
const titleIn = document.getElementById('title');
const authorIn = document.getElementById('author');
// const pagesIn = document.getElementById('pages');
const selectIn = document.querySelector('select');

function Book() {
    this.title = titleIn.value;
    this.author = authorIn.value;
    // this.pages = pagesIn.value;
    this.isRead = Boolean(selectIn.value) ? 'read' : 'not read';
}

/* ====================== CLICK TO DISPLAY BOOK ======================= */
const subBtn = document.querySelector('button');

subBtn.addEventListener('click', () => {
    if (titleIn.value !== '' && authorIn.value !== '') {
        if (!myLibrary.some(book => book.title === titleIn.value)) {
            myLibrary.push(new Book());
            table.innerHTML = null;
            displayBook();
            titleIn.value = null;
            authorIn.value = null;
        } else {alert("a book with this title already exists!")}
    } else {alert("please fill all the fields!")}
});

/* =================== REMOVE BOOK FROM ARRAY & DOM =================== */
table.addEventListener('click', (e) => {
    if (e.target.getAttribute('class') === 'remove') {
        let row = e.target.parentElement.parentElement;
        let rowTitle = row.firstChild.textContent;
        const found = myLibrary.find(book => book.title === rowTitle);

        if (confirm(`Are you sure you want to remove ${rowTitle}?`)) {
            table.removeChild(row);
            for (let i = 0; i < myLibrary.length; i++) {
                (myLibrary[i] === found) && myLibrary.splice(i, 1);
            }
        }
    }
});

/* =================== TOGGLE STATUS ON ARRAY & DOM =================== */
table.addEventListener('click', (e) => {
    if (e.target.getAttribute('class') === 'status') {
        let rowTitle = e.target.parentElement.parentElement.firstChild.textContent;
        const found = myLibrary.find(book => book.title === rowTitle);
        
        e.target.textContent = (e.target.textContent === "read") ? "not read" : "read";
        found.isRead = (found.isRead === "read") ? "not read" : "read";

    }
});


/* ======================== CHANGE FORM STYLE ========================= */
const initBtn = document.getElementById('add');

initBtn.addEventListener('click', () => {
    titleIn.classList.add('form-active');
    authorIn.classList.add('form-active');
    selectIn.classList.add('form-active');
    subBtn.classList.add('form-active');
    initBtn.classList.add('init-inactive');
})

const form = document.querySelector('form');
window.addEventListener('mousedown', (e) => {
    if (!(e.target.parentElement === form || e.target === form)) {
        titleIn.classList.remove('form-active');
        authorIn.classList.remove('form-active');
        selectIn.classList.remove('form-active');
        subBtn.classList.remove('form-active');
        initBtn.classList.remove('init-inactive');
    }
})