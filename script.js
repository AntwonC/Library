let myLibrary = []; 
const addBookButton = document.querySelector(".newBook-Button");
const formContainer = document.querySelector(".form-container"); 

function Book(title, author, read) {
    this.title = title; 
    this.author = author;
    this.read = read; 
    // the constructor
}

function addBookToLibrary() {
    // do stuff here
}

function printLibrary() {
    // Use for-in to iterate over Objects
    // Use regular looping to iterate over normal array
    for(let i = 0; i < myLibrary.length; i++) {
        console.log(`${myLibrary[i].title}, ${myLibrary[i].author}`);
    }
}

function createForm() {
    console.log("Creating form...");
    // Book Name input
    const inputBookName = document.createElement("input");
    inputBookName.classList.add("input-Book");
    inputBookName.placeholder = "Book Name";
    const inputBookAuthor = document.createElement("input"); 
    inputBookAuthor.classList.add("input-Book");
    inputBookAuthor.placeholder = "Author";
    formContainer.appendChild(inputBookName);
    formContainer.appendChild(inputBookAuthor);   
    
}

addBookButton.addEventListener("click", createForm);
//myLibrary[0] = bookObject; 
//myLibrary[1] = secondBook; 
//myLibrary[2] = thirdBook; 

//console.log(myLibrary[0].title + ", " + myLibrary[0].author); 
console.table(myLibrary); 


//printLibrary(); 
