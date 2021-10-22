let myLibrary = []; 
const addBookButton = document.querySelector(".newBook-Button");
const formContainer = document.querySelector(".form-container"); 
const tableContainer = document.querySelector(".table-container"); 

function Book(title, author, read) {
    this.title = title; 
    this.author = author;
    this.read = read; 
    // the constructor
}

function addBookToLibrary(bookObject) {
    console.log(`${bookObject.title}, ${bookObject.author}, ${bookObject.read}`)
    myLibrary.push(bookObject);  
    // do stuff here
}

function printLibrary() {
    // Use for-in to iterate over Objects
    // Use regular looping to iterate over normal array
    for(let i = 0; i < myLibrary.length; i++) {
        //console.log(`${myLibrary[i].title}, ${myLibrary[i].author}, ${myLibrary[i].read}`);
    }
}

function removeBook(removeButton) {
    const cells = document.querySelectorAll("td"); 
    
    console.log(removeButton.closest("tr").rowIndex); // Gets the row needed to remove. 
  /*  cells.forEach(cell => {
        console.log(`cell: ${cell.closest("tr").rowIndex}`);
 
    }) */
}

function createForm() {
    console.log("Creating form...");
    // Avoids adding too many elements
    if ( formContainer.childElementCount > 1 ) {
        return ; 
    }
    // Book Name input
    const inputBookName = document.createElement("input");
    inputBookName.classList.add("input-Book");
    inputBookName.placeholder = "Book Name";
    // Author input
    const inputBookAuthor = document.createElement("input"); 
    inputBookAuthor.classList.add("input-Book");
    inputBookAuthor.placeholder = "Author";
    const inputRead = document.createElement("input"); 
    inputRead.classList.add("input-Book");
    inputRead.placeholder = "Read yet?";
    // Submit button
    const submitButton = document.createElement("button"); 
    submitButton.classList.add("input-Book"); 
    submitButton.setAttribute("type", "button");
    submitButton.style = "width: 75px; height: 25px;";
    submitButton.textContent = "Add Book"; 
    // Form Container
    formContainer.appendChild(inputBookName);
    formContainer.appendChild(inputBookAuthor);
    formContainer.appendChild(inputRead);    
    formContainer.appendChild(submitButton);

    submitButton.addEventListener("click", function() {
        const bookName = inputBookName.value; 
        const authorName = inputBookAuthor.value; 
        const read = inputRead.value; 
     
        // Create new Book object and add to Library
        const book = new Book(bookName, authorName, read); 
        addBookToLibrary(book);
        
        // Adding new book to the library in a table format for user to see
        const trElement = document.createElement("tr"); 
        const tdName = document.createElement("td"); 
        tdName.textContent = bookName; 
        const tdAuthor = document.createElement("td"); 
        tdAuthor.textContent = authorName; 
        const tdRead = document.createElement("td"); 
        tdRead.textContent = read;
        const tdPlaceholder = document.createElement("td");
        const removeOption = document.createElement("button");
        removeOption.textContent = "Remove"; 
        
        // Adding elements to the table
        tableContainer.appendChild(trElement); 
        trElement.appendChild(tdName); 
        trElement.appendChild(tdAuthor); 
        trElement.appendChild(tdRead); 
        tdPlaceholder.appendChild(removeOption);  
        trElement.appendChild(tdPlaceholder); 

        removeOption.addEventListener("click", function() {
            removeBook(tdPlaceholder); 
        });
        // Remove the form elements. No longer needed. 
        inputBookName.remove(); 
        inputBookAuthor.remove(); 
        inputRead.remove(); 
        submitButton.remove(); 

        //printLibrary(); 
        console.table(myLibrary);
        //console.table(myLibrary);
       // data = bookName + authorName + read; 
        //console.log(`res: ${res}`);
        //console.log(`${bookName} | ${authorName} | ${read}`);
        
        // console.log("Submit button is clicked"); 
    });

}

addBookButton.addEventListener("click", createForm);

//myLibrary[0] = bookObject; 
//myLibrary[1] = secondBook; 
//myLibrary[2] = thirdBook; 

//console.log(myLibrary[0].title + ", " + myLibrary[0].author); 
//console.table(myLibrary); 


//printLibrary(); 
