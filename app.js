//Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI constructor
function UI() {}

UI.prototype.addBookToList = function(book) {
  const list = document.getElementById("book-list");
  //create tr element

  const row = document.createElement("tr");

  //insert columns
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</td>
  `;

  list.appendChild(row);
};

UI.prototype.showAlert = function(message, className) {
  //create div
  const div = document.createElement("div");
  div.className = `alert ${className}`;
  //add text
  div.appendChild(document.createTextNode(message));
  //get parent
  const container = document.querySelector(".container");

  const form = document.querySelector("#book-form");
  //insert alert
  container.insertBefore(div, form);

  //disapper after 3s
  setTimeout(function() {
    document.querySelector(".alert").remove();
  }, 3000);
};

UI.prototype.clearFields = function() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

UI.prototype.deleteBook = function(target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

//Event Listeners

document.getElementById("book-form").addEventListener("submit", function(e) {
  //get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  const book = new Book(title, author, isbn);
  //instantiate ui

  const ui = new UI();

  //validation
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill in all fields.", "error");
  } else {
    //ui add book to list

    ui.addBookToList(book);

    //show alert
    ui.showAlert(`Added book: ${book.title}`, "success");

    //clear fields
    ui.clearFields();
  }
  e.preventDefault();
});

//event listener for delete

document.getElementById("book-list").addEventListener("click", function(e) {
  const ui = new UI();
  ui.deleteBook(e.target);

  //show alert
  ui.showAlert(`Deleted Book`, "success");
  e.preventDefault();
});
