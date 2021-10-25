let myLibrary = []; 
const addBookButton = document.querySelector(".newBook-Button");
const formContainer = document.querySelector(".form-container"); 
const tableContainer = document.querySelector(".table-container"); 

var counter = 0; 

function Book(title, author, read) {
    this.title = title; 
    this.author = author;
    this.read = read; 
    // the constructor
}

function addBookToLibrary(bookObject) {
    //console.log(`${bookObject.title}, ${bookObject.author}, ${bookObject.read}`)
    myLibrary.push(bookObject);  
   // localStorage.setItem("book", bookObject);
    localStorage.setItem("title" + counter, bookObject.title);
    localStorage.setItem("author" + counter, bookObject.author);
    localStorage.setItem("read" + counter, bookObject.read);

    console.table(localStorage);
    counter++; 
}

function printLibrary() {
    // Use for-in to iterate over Objects
    // Use regular looping to iterate over normal array
    for(let i = 0; i < myLibrary.length; i++) {
        //console.log(`${myLibrary[i].title}, ${myLibrary[i].author}, ${myLibrary[i].read}`);
    }
}

function populateLibrary() {
    console.log(`length: ${localStorage.length} | counter: ${counter}`); 
    console.table(localStorage); 

    for(let i = 0; i < localStorage.length; i++) {
        //console.log(localStorage.getItem("book")); 

        if ( localStorage.getItem("title" + i) === null && localStorage.getItem("author" + i) === null && localStorage.getItem("read" + i) === null ) {
            //counter++; 
            continue; 
        } else {
            const retrieveBook = new Book(localStorage.getItem("title" + i),localStorage.getItem("author" + i), localStorage.getItem("read" + i));
            counter = i; 
            addBookToLibrary(retrieveBook); 
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
                removeBook(tdPlaceholder, trElement, i);
            });
    
            changeReadStatus.addEventListener("click", function() { // When change read button is clicked
                changeRead(changeReadStatus, tdRead); 
            });

        }


    }

    //localStorage.clear(); 
    console.table(myLibrary); 
}

function removeBook(removeButton, trElement, i) {
   // const cells = document.querySelectorAll("td"); 
    const index = removeButton.closest("tr").rowIndex; 

    if ( typeof i === "undefined" ) {
        removeFromStorage(index-1); 
    } else {
        removeFromStorage(i); 
    }
    console.log(`index: ${index}| i: ${i}`); // Gets the row needed to remove. 
    trElement.remove(); 
    removeButton.remove(); 
    myLibrary.splice(index-1, 1); // Update array
    console.table(myLibrary);
}

function removeFromStorage(index) {
    console.log(`index: ${index} in removeFromStorage()| counter: ${counter}`);

    if ( typeof index === 'undefined' ) {
        console.log("UNDEFINED");
    }
    
    localStorage.removeItem("title" + index);
    localStorage.removeItem("author" + index);
    localStorage.removeItem("read" + index);
    
    console.table(localStorage); 
    console.log(`${localStorage.length}`);
    
}

function changeRead(readButton, tdRead) {
    const index = readButton.closest("tr").rowIndex; 
    const libraryIndex = myLibrary[index-1].read;

    console.log(`libraryIndex: |${libraryIndex}|`); 

    if ( libraryIndex.localeCompare("No") === 0 ) {
        myLibrary[index-1].read = "Yes";
        tdRead.textContent = myLibrary[index-1].read; 
    } else {
        myLibrary[index-1].read = "No";
        tdRead.textContent = myLibrary[index-1].read; 
    }
    
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
    // Buttons for Read/Not Read

    const readContainer = document.createElement("div"); 
    readContainer.classList.add("read-Container");

    const inputRead = document.createElement("input"); 
    inputRead.setAttribute("type", "radio");
    inputRead.setAttribute("id", "readYes");
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
            removeBook(tdPlaceholder, trElement); 
        });

        changeReadStatus.addEventListener("click", function() { // When change read button is clicked
            changeRead(changeReadStatus, tdRead); 
        });
        // Remove the form elements. No longer needed. 
        inputBookName.remove(); 
        inputBookAuthor.remove(); 
        readContainer.remove(); 
        submitButton.remove(); 

        console.table(myLibrary);

    });

}
//localStorage.clear(); 
populateLibrary(); 
addBookButton.addEventListener("click", createForm);

//myLibrary[0] = bookObject; 
//myLibrary[1] = secondBook; 
//myLibrary[2] = thirdBook; 

//console.log(myLibrary[0].title + ", " + myLibrary[0].author); 
//console.table(myLibrary); 


//printLibrary(); 
