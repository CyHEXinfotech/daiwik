document.addEventListener("DOMContentLoaded", function () {
    const selectedProducts = JSON.parse(sessionStorage.getItem("selectedProducts")) || [];
    const selectedItemsTable = document.querySelector("#selectedItemsTable");
    console.log(selectedProducts)
    // Display selected items in a table on the second page
    selectedProducts.forEach((product) => {
        const row = selectedItemsTable.insertRow(-1);
        const productCell = row.insertCell(0)
        const activeIngredientCell = row.insertCell(1);
        const formCell = row.insertCell(2);
        const packTypeCell = row.insertCell(3);
        const packingStyleCell = row.insertCell(4);

        productCell.textContent = product["Product"]
        activeIngredientCell.textContent = product["Active Ingredient"];
        formCell.textContent = product["Form"];
        packTypeCell.textContent = product["Pack Type"];
        packingStyleCell.textContent = product["Packing Style"];

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
