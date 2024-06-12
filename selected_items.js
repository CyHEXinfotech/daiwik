document.addEventListener("DOMContentLoaded", function () {
    const selectedProducts = JSON.parse(sessionStorage.getItem("selectedProducts")) || [];
    const selectedItemsTable = document.querySelector("#selectedItemsTable");
    
    // Display selected items in a table on the second page
    selectedProducts.forEach((product) => {
        const row = selectedItemsTable.insertRow(-1);
        
        // Extract the first 5 columns from the product
        const columnsToDisplay = Object.values(product).slice(0, 6);
        
        // Loop through each property in the product object and create cells
        columnsToDisplay.forEach(value => {
            const cell = row.insertCell();
            cell.textContent = value;
        });
    });

    // Function to handle form submission
    const form = document.querySelector('form');
    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        // Get form data
        const formData = new FormData(form);

        // Format form data
        const formattedData = {};
        formData.forEach((value, key) => {
            formattedData[key] = value;
        });

        // Add selected products to formatted data
        formattedData.selectedProducts = selectedProducts;

        // Send data to Formspree
        const response = await fetch('https://formspree.io/f/xjvqlyak', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formattedData)
        });

        if (response.ok) {
            alert('Enquiry submitted successfully!');
        } else {
            alert('Error submitting enquiry. Please try again later.');
        }
    });
});
