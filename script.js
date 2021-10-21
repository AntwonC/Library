let myLibrary = []; 

function Book(title, author) {
    this.title = title; 
    this.author = author;
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

const bookObject = new Book("Clean Code", "Robert Cecil Martin"); 
const secondBook = new Book("The Pragmatic Programmer", "Andy Hunt and Dave Thomas");
const thirdBook = new Book("Code: The Hidden Language of Computer Hardware and Software", "Charles Petzold");

myLibrary[0] = bookObject; 
myLibrary[1] = secondBook; 
myLibrary[2] = thirdBook; 

//console.log(myLibrary[0].title + ", " + myLibrary[0].author); 
console.table(myLibrary); 


printLibrary(); 
