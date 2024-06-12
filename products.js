document.addEventListener("DOMContentLoaded", async function () {
    // Fetch data from specialty.json
    const specialtyResponse = await fetch('international_products.json');
    const specialtyData = await specialtyResponse.json();

    // Fetch data from domestic_products.json
    const domesticResponse = await fetch('domestic_products.json');
    const domesticData = await domesticResponse.json();

    // Reference to the table bodies and head
    const specialtyTableHead = document.querySelector("#productTable thead tr");
    const specialtyTableBody = document.querySelector("#productTable tbody");
    const domesticTableHead = document.querySelector("#domesticProductsTable thead tr");
    const domesticTableBody = document.querySelector("#domesticProductsTable tbody");

    // Create an array to store selected products
    const selectedProducts = [];

    // Function to populate the specialty table with data
    function populateSpecialtyTable(products) {
        // Clear existing rows
        specialtyTableBody.innerHTML = "";

        products.forEach((product) => {
            const row = document.createElement("tr");

            // Create cells for each column based on the product keys
            Object.keys(product).forEach((key) => {
                const cell = document.createElement("td");
                cell.textContent = product[key];
                row.appendChild(cell);
            });

            // Add the select checkbox
            const selectCell = document.createElement("td");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.addEventListener("change", function () {
                const isChecked = checkbox.checked;
                if (isChecked) {
                    selectedProducts.push(product);
                } else {
                    const index = selectedProducts.findIndex(p => p["Sr. No."] === product["Sr. No."]);
                    if (index !== -1) {
                        selectedProducts.splice(index, 1);
                    }
                }
            });
            selectCell.appendChild(checkbox);
            row.appendChild(selectCell);

            specialtyTableBody.appendChild(row);
        });
    }

   // Function to populate the domestic products table with data
    function populateDomesticTable(products) {
        // Clear existing rows
        domesticTableBody.innerHTML = "";

        products.forEach((product) => {
            const row = document.createElement("tr");

            // Create cells for each column based on the product keys
            Object.keys(product).forEach((key) => {
                const cell = document.createElement("td");
                cell.textContent = product[key];
                row.appendChild(cell);
            });

            // Add the select checkbox
            const selectCell = document.createElement("td");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.addEventListener("change", function () {
                const isChecked = checkbox.checked;
                if (isChecked) {
                    selectedProducts.push(product);
                } else {
                    const index = selectedProducts.findIndex(p => p["Sr. No."] === product["Sr. No."]);
                    if (index !== -1) {
                        selectedProducts.splice(index, 1);
                    }
                }
            });
            selectCell.appendChild(checkbox);
            row.appendChild(selectCell);

            domesticTableBody.appendChild(row);
        });
    }


    // Function to generate specialty table headers
    function generateTableHeaders(product, tableHead) {
        tableHead.innerHTML = "";
        Object.keys(product).forEach((key) => {
            const th = document.createElement("th");
            th.textContent = key;
            tableHead.appendChild(th);
        });
        const th = document.createElement("th");
        th.textContent = 'Enquiry';
        tableHead.appendChild(th);
    }

    // Generate specialty table headers and populate table with initial data
    if (specialtyData.length > 0) {
        generateTableHeaders(specialtyData[0], specialtyTableHead);
        populateSpecialtyTable(specialtyData);
    }

    // Generate domestic table headers and populate table with data
    if (domesticData.length > 0) {
        generateTableHeaders(domesticData[0], domesticTableHead);
        populateDomesticTable(domesticData);
    }

    // Add event listeners to nav items if needed
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
