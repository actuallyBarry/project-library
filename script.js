let myLibrary = [{title: 'Harry Potter', author: 'J.K. Rowling', pages: 480, status: 'not read'}, {title: 'Chemist', author: 'Koala Poilo', pages: 262, status: 'read'}];

/* ========================== DISPLAY BOOKS =========================== */
const table = document.querySelector('tbody');

function displayBook() {
myLibrary.forEach((book) => {
    let htmlRow = `<tr><td>${book.title}</td><td>${book.author}</td><td><div class='status'>${book.status}</div></td><td><div class='remove'>Remove</div></td></tr>`;

    table.insertAdjacentHTML("beforeend", htmlRow);
    })
}

displayBook();

/* ======================= CONSTRUCTOR FUNCTION ======================= */
const titleIn = document.getElementById('title');
const authorIn = document.getElementById('author');
const selectIn = document.querySelector('select');

class Book {
    constructor() {
        this.title = titleIn.value;
        this.author = authorIn.value;
        this.status = selectIn.value;
    }
}

/* ====================== CLICK TO DISPLAY BOOK ======================= */
const subBtn = document.querySelector('button');

subBtn.addEventListener('click', (e) => {
    if (titleIn.value.trim() == '') {
        titleIn.setCustomValidity("Please put in a title!");
    } else if (authorIn.value.trim() == '') {
        authorIn.setCustomValidity("Please put in a name!");
    } else if (myLibrary.some(book => book.title == titleIn.value.trim())) {
        titleIn.setCustomValidity("Title already exists! Please enter a different one.");
    } else {
        myLibrary.push(new Book());
        table.innerHTML = null;
        displayBook();
        titleIn.value = null;
        authorIn.value = null;
        e.preventDefault();
    }
})
titleIn.addEventListener('input', () => {
    if (titleIn.value.trim() != '') {
        titleIn.setCustomValidity("")
    }
})
authorIn.addEventListener('input', () => {
    if (authorIn.value.trim() != '') {
        authorIn.setCustomValidity("")
    }
})

/* ============= REMOVE BOOK / TOGGLE STATUS (ARRAY & DOM) ============ */
table.addEventListener('click', (e) => {
    const clickedRow = e.target.parentElement.parentElement;
    const rowTitle = clickedRow.firstChild.textContent;
    const found = myLibrary.find(book => book.title === rowTitle);

    if (e.target.getAttribute('class') === 'remove') {
        if (confirm(`Are you sure you want to remove "${rowTitle}" ?`)) {
            table.removeChild(clickedRow);
            for (let i = 0; i < myLibrary.length; i++) {
                (myLibrary[i] === found) && myLibrary.splice(i, 1);
            }
        }
    }
    if (e.target.getAttribute('class') === 'status') {
        e.target.textContent = (e.target.textContent === "read") ? "not read" : "read";
        found.status = (found.status === "read") ? "not read" : "read";
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
