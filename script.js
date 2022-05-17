//let myLibrary = []; 
const addBookButton = document.querySelector(".newBook-Button");
const formContainer = document.querySelector(".form-container"); 
const tableContainer = document.querySelector(".table-container");
const alertContainer = document.querySelector(".alert-container");  

var counter = 0; 


class Book {

    constructor(title, author, read) {
        this.title = title; 
        this.author = author; 
        this.read = read; 
    }
}

class myLibrary {
    
    constructor(library = []) {
        this.library = library; 
    }

    addBookToLibrary(bookObject) {
       
        this.library.push(bookObject); 
       // myLibrary.push(bookObject);  
    
        localStorage.setItem("title" + counter, bookObject.title);
        localStorage.setItem("author" + counter, bookObject.author);
        localStorage.setItem("read" + counter, bookObject.read);
    
        counter++; 
        console.log(this.library); 
    }

    removeBook(removeButton, trElement, i) { 
        const index = removeButton.closest("tr").rowIndex; 
    
        if ( typeof i === "undefined" ) {
            removeFromStorage(index-1); 
        } else {
            removeFromStorage(i); 
        }
    
        trElement.remove(); 
        removeButton.remove(); 
        this.library.splice(index-1, 1); // Update array
        console.log(this.library); 
        
    }

    changeRead(readButton, tdRead) {
        const index = readButton.closest("tr").rowIndex; 
        const libraryIndex = this.library[index-1].read;
    
        if ( libraryIndex.localeCompare("No") === 0 ) {
            this.library[index-1].read = "Yes";
            tdRead.textContent = this.library[index-1].read; 
            localStorage.setItem("read" + (index-1), this.library[index-1].read);
        } else {
            this.library[index-1].read = "No";
            tdRead.textContent = this.library[index-1].read; 
            localStorage.setItem("read" + (index-1), this.library[index-1].read);
        }
        
    }
}

/*function Book(title, author, read) {
    this.title = title; 
    this.author = author;
    this.read = read; 
    // the constructor
} */

/* function addBookToLibrary(bookObject) {
    myLibrary.push(bookObject);  

    localStorage.setItem("title" + counter, bookObject.title);
    localStorage.setItem("author" + counter, bookObject.author);
    localStorage.setItem("read" + counter, bookObject.read);

    counter++; 
} */


function populateLibrary() {

    for(let i = 0; i < localStorage.length; i++) {
   
        if ( localStorage.getItem("title" + i) === null && localStorage.getItem("author" + i) === null && localStorage.getItem("read" + i) === null ) {
            continue; 
        } else {
            const retrieveBook = new Book(localStorage.getItem("title" + i),localStorage.getItem("author" + i), localStorage.getItem("read" + i));
            counter = i; 
            library.addBookToLibrary(retrieveBook); 
            //counter++; 
    
            const trElement = document.createElement("tr"); 
            const tdName = document.createElement("td"); 
            tdName.textContent = retrieveBook.title; 
            const tdAuthor = document.createElement("td"); 
            tdAuthor.textContent = retrieveBook.author; 
            const tdRead = document.createElement("td"); 
            tdRead.textContent = retrieveBook.read;
    
            // Remove Button
            const tdPlaceholder = document.createElement("td");
            const removeOption = document.createElement("button");
            removeOption.textContent = "Remove"; 
            // Change Read button
            const tdReadPlaceholder = document.createElement("td");
            const changeReadStatus = document.createElement("button");
            changeReadStatus.textContent = "Change";
    
            
            // Adding elements to the table
            tableContainer.appendChild(trElement); 
            trElement.appendChild(tdName); 
            trElement.appendChild(tdAuthor); 
            trElement.appendChild(tdRead); 
            tdPlaceholder.appendChild(removeOption); // Adding tdPlaceholder button
            tdReadPlaceholder.appendChild(changeReadStatus); // Adding tdReadPlaceholder button
            // Add the placeholders to the tr element
            trElement.appendChild(tdPlaceholder); 
            trElement.appendChild(tdReadPlaceholder);
    
    
    
            removeOption.addEventListener("click", function() {  // When remove button is clicked
                library.removeBook(tdPlaceholder, trElement, i);
            });
    
            changeReadStatus.addEventListener("click", function() { // When change read button is clicked
                library.changeRead(changeReadStatus, tdRead); 
            });

        }


    }

}

/* function removeBook(removeButton, trElement, i) { 
    const index = removeButton.closest("tr").rowIndex; 

    if ( typeof i === "undefined" ) {
        removeFromStorage(index-1); 
    } else {
        removeFromStorage(i); 
    }

    trElement.remove(); 
    removeButton.remove(); 
    myLibrary.splice(index-1, 1); // Update array
    
} */

function removeFromStorage(index) {

    const currentLength = localStorage.length; 

    localStorage.removeItem("title" + index);
    localStorage.removeItem("author" + index);
    localStorage.removeItem("read" + index);
    // Add one and check if the lenghts are the same. Means that nothing was removed
    if ( localStorage.length === currentLength ) {
        index += 1; 
        localStorage.removeItem("title" + index);
        localStorage.removeItem("author" + index);
        localStorage.removeItem("read" + index);
    }
    
}

/* function changeRead(readButton, tdRead) {
    const index = readButton.closest("tr").rowIndex; 
    const libraryIndex = myLibrary[index-1].read;

    if ( libraryIndex.localeCompare("No") === 0 ) {
        myLibrary[index-1].read = "Yes";
        tdRead.textContent = myLibrary[index-1].read; 
        localStorage.setItem("read" + (index-1), myLibrary[index-1].read);
    } else {
        myLibrary[index-1].read = "No";
        tdRead.textContent = myLibrary[index-1].read; 
        localStorage.setItem("read" + (index-1), myLibrary[index-1].read);
    }
    
} */

function createForm() {
  
    // Avoids adding too many elements
    if ( formContainer.childElementCount > 1 ) {
        return ; 
    }
    // Book Name input
    const inputBookName = document.createElement("input");
    inputBookName.classList.add("input-Book");
    inputBookName.setAttribute("required", "");
    inputBookName.placeholder = "Book Name";
    // Author input
    const inputBookAuthor = document.createElement("input"); 
    inputBookAuthor.classList.add("input-Book");
    inputBookAuthor.setAttribute("required", "");
    inputBookAuthor.placeholder = "Author";
    // Buttons for Read/Not Read

    const readContainer = document.createElement("div"); 
    readContainer.classList.add("read-Container");

    const inputRead = document.createElement("input"); 
    inputRead.setAttribute("type", "radio");
    inputRead.setAttribute("id", "readYes");
    inputRead.checked = true;
    inputRead.name = "readChoice"; 
    inputRead.value = "Read";
    // Label for read radio button
    const labelRead = document.createElement("label"); 
    labelRead.setAttribute("for", "Read");
    labelRead.textContent = "Read";

    const inputNotRead = document.createElement("input"); 
    inputNotRead.setAttribute("type", "radio");
    inputNotRead.setAttribute("id", "readNo"); 
    inputNotRead.name = "readChoice";
    inputNotRead.value = "Not Read";

    // Label for not read radio button 
    const labelNotRead = document.createElement("label"); 
    labelNotRead.setAttribute("for", "Not Read");
    labelNotRead.textContent = "Not Read";

    // Submit button
    const submitButton = document.createElement("button"); 
    submitButton.classList.add("input-Book"); 
    submitButton.setAttribute("type", "button");
    submitButton.style = "width: 75px; height: 25px;";
    submitButton.textContent = "Add Book"; 
    // Form Container
    formContainer.appendChild(inputBookName);
    formContainer.appendChild(inputBookAuthor);

    // Container for radio buttons
    readContainer.appendChild(inputRead); 
    readContainer.appendChild(labelRead); 
    readContainer.appendChild(inputNotRead);   
    readContainer.appendChild(labelNotRead); 

    formContainer.appendChild(readContainer);
    formContainer.appendChild(submitButton);

    submitButton.addEventListener("click", function() {
        // Get the selected radio button
        const form = document.querySelector("form"); 
        var data = new FormData(form); 
        var output = ""; 

        for(const entry of data ) {
            output = entry[1];
        }

        const bookName = inputBookName.value; 
        const authorName = inputBookAuthor.value;
        
        // Change to match the "yes/no" read option 
        if ( output.localeCompare("Not Read") === 0 ) {
            output = "No"; 
        } else {
            output = "Yes"; 
        }
        const read = output; 

        // Validation using the Constraint Validation API 
        
        if ( inputBookName.validity.valueMissing ) {
            inputBookName.setCustomValidity("You cannot leave the book name blank!"); 
            //alertContainer.textContent = inputBookName.validationMessage; 
            inputBookName.reportValidity(); 
            return;
        } else if ( inputBookAuthor.validity.valueMissing ) {
            inputBookAuthor.setCustomValidity("You cannot leave the author name blank!"); 
            inputBookAuthor.reportValidity(); 
            //alertContainer.textContent = inputBookAuthor.validationMessage; 
            return;
        }

        inputBookName.setCustomValidity(""); 
        inputBookAuthor.setCustomValidity(""); 

        
        // Custom Validation using pure JS
       /* if ( bookName.localeCompare("") === 0 && authorName.localeCompare("") === 0 ) {
            //const divAlert = document.createElement("div"); 
            alertContainer.textContent = "Book Name and Author cannot be blank";
           // alertContainer.appendChild(divAlert); 
            return; 
        } else if ( bookName.localeCompare("") !== 0 && authorName.localeCompare("") === 0 ) {
           // const divAlert = document.createElement("div"); 
           alertContainer.textContent = "Author cannot be blank";
            //alertContainer.appendChild(divAlert); 
            return; 
        } else if ( bookName.localeCompare("") === 0 && authorName.localeCompare("") !== 0  ) {
            //const divAlert = document.createElement("div"); 
            alertContainer.textContent = "Book Name cannot be blank";
            //alertContainer.appendChild(divAlert); 
            return; 
        } */
        alertContainer.textContent = "";
       // alertContainer.removeChild(alertContainer.firstChild); 
        // Create new Book object and add to Library
        const book = new Book(bookName, authorName, read); 
        library.addBookToLibrary(book);
        
        // Adding new book to the library in a table format for user to see
        const trElement = document.createElement("tr"); 
        const tdName = document.createElement("td"); 
        tdName.textContent = bookName; 
        const tdAuthor = document.createElement("td"); 
        tdAuthor.textContent = authorName; 
        const tdRead = document.createElement("td"); 
        tdRead.textContent = read;

        // Remove Button
        const tdPlaceholder = document.createElement("td");
        const removeOption = document.createElement("button");
        removeOption.textContent = "Remove"; 
        // Change Read button
        const tdReadPlaceholder = document.createElement("td");
        const changeReadStatus = document.createElement("button");
        changeReadStatus.textContent = "Change";

        
        // Adding elements to the table
        tableContainer.appendChild(trElement); 
        trElement.appendChild(tdName); 
        trElement.appendChild(tdAuthor); 
        trElement.appendChild(tdRead); 
        tdPlaceholder.appendChild(removeOption); // Adding tdPlaceholder button
        tdReadPlaceholder.appendChild(changeReadStatus); // Adding tdReadPlaceholder button
        // Add the placeholders to the tr element
        trElement.appendChild(tdPlaceholder); 
        trElement.appendChild(tdReadPlaceholder);
        
        removeOption.addEventListener("click", function() {  // When remove button is clicked
            library.removeBook(tdPlaceholder, trElement); 
        });

        changeReadStatus.addEventListener("click", function() { // When change read button is clicked
            library.changeRead(changeReadStatus, tdRead); 
        });
        // Remove the form elements. No longer needed. 
        inputBookName.remove(); 
        inputBookAuthor.remove(); 
        readContainer.remove(); 
        submitButton.remove(); 

       

    });

}
let library = new myLibrary([]); 
populateLibrary(); 
addBookButton.addEventListener("click", createForm);
