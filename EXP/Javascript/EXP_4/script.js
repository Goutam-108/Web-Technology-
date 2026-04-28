// 1. Select the elements
const myButton = document.getElementById('regBtn');
const myInput = document.getElementById('username');
const myDisplay = document.getElementById('message');

// 2. Add the "Click" logic
myButton.addEventListener('click', function() {
    
    // Get the text from the input
    const name = myInput.value;

    // 3. Manipulate the DOM
    if (name === "") {
        myDisplay.textContent = "Please enter a name!";
        myDisplay.style.color = "red";
    } else {
        myDisplay.textContent = "Success! Welcome, " + name;
        myDisplay.style.color = "green";
        
        // Hide the input after success
        myInput.style.display = "none";
        myButton.style.display = "none";
    }
});