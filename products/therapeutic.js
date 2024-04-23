document.addEventListener("DOMContentLoaded", async function () {
    // Fetch data from products.json
    const response = await fetch('products.json');
    const productData = await response.json();

    // Reference to the table body
    const tableBody = document.querySelector("#productTable tbody");

    // Create an array to store selected products
    const selectedProducts = [];

    // Function to populate the table with data
    function populateTable(products) {
        // Clear existing rows
        tableBody.innerHTML = "";

        products.forEach((product) => {
            const productName = product["Active Ingredient"];
            const form = product["Form"];
            const strength = product["Strength"];
            const packType = product["Pack Type"];
            const packingSize = product["Packing Style"];

            const row = document.createElement("tr");

            // Create cells for each column
            const activeIngredientCell = document.createElement("td");
            activeIngredientCell.textContent = productName;
            row.appendChild(activeIngredientCell);

            const formCell = document.createElement("td");
            formCell.textContent = form;
            row.appendChild(formCell);

            const strengthCell = document.createElement("td");
            strengthCell.textContent = strength;
            row.appendChild(strengthCell);

            const packTypeCell = document.createElement("td");
            packTypeCell.textContent = packType;
            row.appendChild(packTypeCell);

            const packingSizeCell = document.createElement("td");
            packingSizeCell.textContent = packingSize;
            row.appendChild(packingSizeCell);

            const selectCell = document.createElement("td");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.addEventListener("change", function () {
                const isChecked = checkbox.checked;
                const productObject = {
                    "Active Ingredient": productName,
                    "Form": form,
                    "Strength": strength,
                    "Pack Type": packType,
                    "Packing Size": packingSize
                };
                if (isChecked) {
                    selectedProducts.push(productObject);
                } else {
                    const index = selectedProducts.findIndex(p => p["Active Ingredient"] === productName);
                    if (index !== -1) {
                        selectedProducts.splice(index, 1);
                    }
                }
            });
            selectCell.appendChild(checkbox);
            row.appendChild(selectCell);

            tableBody.appendChild(row);
        });
    }

    // Function to handle nav item click
    function handleNavItemClick(navItem) {
        const key = navItem.textContent;
        const products = productData.find(item => item[key]);
        populateTable(products[key]);
        document.getElementById('topContent').scrollIntoView({ behavior: 'smooth' });

    }

    // Add event listeners to nav items
    const navItems = document.querySelectorAll("#sideNav li");
    navItems.forEach(item => {
        item.addEventListener("click", function () {
            handleNavItemClick(item);
        });
    });

    // Handle form submission
    const requestForm = document.querySelector("#requestForm");
    requestForm.addEventListener("submit", function (event) {
        event.preventDefault();
        sessionStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
        window.location.href = "selected_item.html";
    });
});
