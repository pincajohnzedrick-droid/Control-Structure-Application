function calculateItemAmount(price, quantity) {
    return price * quantity;
}

function calculateDiscount(subtotal) {
    let discount = 0;

    if (subtotal >= 5000) {
        discount = subtotal * 0.10;
    } else if (subtotal >= 3000) {
        discount = subtotal * 0.07;
    } else if (subtotal >= 1000) {
        discount = subtotal * 0.05;
    } else {
        discount = 0;
    }

    return discount;
}

function getDeliveryFee(option) {
    let fee = 0;

    switch (Number(option)) {
        case 1:
            fee = 0;
            break;
        case 2:
            fee = 80;
            break;
        case 3:
            fee = 150;
            break;
        default:
            fee = 0;
            break;
    }

    return fee;
}

if (typeof document !== "undefined") {
    const customerName = document.getElementById("customerName");
    const productCount = document.getElementById("productCount");
    const productsContainer = document.getElementById("productsContainer");
    const deliveryOption = document.getElementById("deliveryOption");
    const calculateBtn = document.getElementById("calculateBtn");
    const validationMessage = document.getElementById("validationMessage");
    const orderSummary = document.getElementById("orderSummary");

    function generateProductInputs(count) {
        productsContainer.innerHTML = "";

        for (let i = 0; i < count; i++) {
            const productDiv = document.createElement("div");

            productDiv.className = "product";

            productDiv.innerHTML = `
                <h3>Product ${i + 1}</h3>

                <label for="productName-${i}">Product Name</label>
                <input type="text" id="productName-${i}">

                <label for="productPrice-${i}">Price</label>
                <input type="number" id="productPrice-${i}" min="0" step="0.01">

                <label for="productQuantity-${i}">Quantity</label>
                <input type="number" id="productQuantity-${i}" min="0" step="any">
            `;

            productsContainer.appendChild(productDiv);
        }
    }

    productCount.addEventListener("input", function () {
        const count = Number(productCount.value);

        validationMessage.textContent = "";
        orderSummary.innerHTML = "";

        if (
            !Number.isFinite(count) ||
            count <= 0 ||
            !Number.isInteger(count)
        ) {
            productsContainer.innerHTML = "";
            return;
        }

        generateProductInputs(count);
    });

    calculateBtn.addEventListener("click", function () {
        validationMessage.textContent = "";
        orderSummary.innerHTML = "";

        const name = customerName.value.trim();
        const count = Number(productCount.value);

        if (name === "") {
            validationMessage.textContent = "Customer Name is required.";
            return;
        } else if (
            !Number.isFinite(count) ||
            count <= 0 ||
            !Number.isInteger(count)
        ) {
            validationMessage.textContent =
                "Number of Products must be a positive whole number.";
            return;
        } else if (productsContainer.children.length !== count) {
            validationMessage.textContent =
                "Please enter the product information.";
            return;
        }

        let subtotal = 0;
        let productDetails = "";

        for (let i = 0; i < count; i++) {
            const productName =
                document.getElementById(`productName-${i}`).value.trim();

            const price =
                Number(document.getElementById(`productPrice-${i}`).value);

            const quantity =
                Number(document.getElementById(`productQuantity-${i}`).value);

            if (productName === "") {
                validationMessage.textContent =
                    `Product Name is required for Product ${i + 1}.`;
                return;
            } else if (!Number.isFinite(price) || price <= 0) {
                validationMessage.textContent =
                    `Price must be a positive number for Product ${i + 1}.`;
                return;
            } else if (!Number.isFinite(quantity) || quantity <= 0) {
                validationMessage.textContent =
                    `Quantity must be a positive number for Product ${i + 1}.`;
                return;
            }

            const itemAmount = calculateItemAmount(price, quantity);

            subtotal += itemAmount;

            productDetails += `
                <div class="product-summary">
                    <strong>${i + 1}. ${productName}</strong>

                    <p class="summary-item">
                        Price: ₱${price.toFixed(2)}
                    </p>

                    <p class="summary-item">
                        Quantity: ${quantity}
                    </p>

                    <p class="summary-item">
                        Amount: ₱${itemAmount.toFixed(2)}
                    </p>
                </div>
            `;
        }

        const discount = calculateDiscount(subtotal);

        let discountRate = 0;

        if (subtotal >= 5000) {
            discountRate = 10;
        } else if (subtotal >= 3000) {
            discountRate = 7;
        } else if (subtotal >= 1000) {
            discountRate = 5;
        } else {
            discountRate = 0;
        }

        const option = Number(deliveryOption.value);
        const deliveryFee = getDeliveryFee(option);

        let deliveryType = "";

        switch (option) {
            case 1:
                deliveryType = "Store Pickup";
                break;
            case 2:
                deliveryType = "Standard Delivery";
                break;
            case 3:
                deliveryType = "Express Delivery";
                break;
            default:
                deliveryType = "Store Pickup";
                break;
        }

        const finalAmount = subtotal - discount + deliveryFee;

        orderSummary.innerHTML = `
            <h2>ORDER SUMMARY</h2>

            <p class="summary-item">
                <strong>Customer:</strong> ${name}
            </p>

            ${productDetails}

            <p class="summary-item">
                <strong>Subtotal:</strong>
                ₱${subtotal.toFixed(2)}
            </p>

            <p class="summary-item">
                <strong>Discount Rate:</strong>
                ${discountRate}%
            </p>

            <p class="summary-item">
                <strong>Discount Amount:</strong>
                ₱${discount.toFixed(2)}
            </p>

            <p class="summary-item">
                <strong>Delivery Type:</strong>
                ${deliveryType}
            </p>

            <p class="summary-item">
                <strong>Delivery Fee:</strong>
                ₱${deliveryFee.toFixed(2)}
            </p>

            <p class="final-amount">
                Final Amount: ₱${finalAmount.toFixed(2)}
            </p>
        `;
    });
}