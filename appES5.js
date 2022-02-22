//Book constructor - going to handle the actual book object.

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI constructor - will be a set of prototype methods to do things like: add book to the list, delete the book etc.

function UI() {}

// Create UI prototype  - Add book to list;
UI.prototype.addBookToList = function (book) {
  const list = document.querySelector(".book-list");
  // Create tr element
  const row = document.createElement("tr");
  // Insert cols
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>`;
  list.appendChild(row);
};
// Show Alert
UI.prototype.showAlert = function (message, className) {
  // Create div
  const div = document.createElement("div");
  // Add classes
  div.className = `alert ${className}`;
  // Add text node
  div.appendChild(document.createTextNode(message));
  // Get parent to insert in DOM
  const container = document.querySelector(".container");
  const form = document.querySelector(".book-form");
  //Insert Alert
  container.insertBefore(div, form);

  // Timeout after 3 seconds
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};
// Delete  Book

UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};
// Clear fields prototype
UI.prototype.clearFields = function () {
  document.querySelector(".title").value = "";
  document.querySelector(".author").value = "";
  document.querySelector(".isbn").value = "";
};
// Event Listeners
document.querySelector(".book-form").addEventListener("submit", function (e) {
  // First get fields values.
  const title = document.querySelector(".title").value,
    author = document.querySelector(".author").value,
    isbn = document.querySelector(".isbn").value;
  // Instantiate a book;
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();
  // Validate
  if (title === " " || author === "" || isbn === "") {
    // Error alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Show success
    ui.showAlert("Book added!", "success");

    // Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event Listenere for delete
document.querySelector(".book-list").addEventListener("click", function (e) {
  const ui = new UI();

  // Delete Book
  ui.deleteBook(e.target);

  // Show alert
  ui.showAlert("Book Removed!", "success");

  e.preventDefault();
});
