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

    switch (option) {
        case "1":
            fee = 0;
            break;
        case "2":
            fee = 80;
            break;
        case "3":
            fee = 150;
            break;
        default:
            fee = 0;
            break;
    }

    return fee;
}

const productCountInput = document.getElementById("productCount");
const productsContainer = document.getElementById("productsContainer");
const calculateBtn = document.getElementById("calculateBtn");
const validationMessage = document.getElementById("validationMessage");
const orderSummary = document.getElementById("orderSummary");

productCountInput.addEventListener("input", function () {
    const productCount = Number(productCountInput.value);

    productsContainer.innerHTML = "";
    validationMessage.textContent = "";
    orderSummary.innerHTML = "";

    if (productCount <= 0 || !Number.isInteger(productCount)) {
        return;
    }

    for (let i = 0; i < productCount; i++) {
        const productDiv = document.createElement("div");

        productDiv.className = "product";

        productDiv.innerHTML = `
            <h3>Product ${i + 1}</h3>

            <label for="productName-${i}">Product Name</label>
            <input
                type="text"
                id="productName-${i}"
                placeholder="Enter product name"
            >

            <label for="productPrice-${i}">Price</label>
            <input
                type="number"
                id="productPrice-${i}"
                min="0"
                step="0.01"
                placeholder="Enter price"
            >

            <label for="productQuantity-${i}">Quantity</label>
            <input
                type="number"
                id="productQuantity-${i}"
                min="1"
                placeholder="Enter quantity"
            >
        `;

        productsContainer.appendChild(productDiv);
    }
});

calculateBtn.addEventListener("click", function () {
    validationMessage.textContent = "";
    orderSummary.innerHTML = "";

    const customerName = document.getElementById("customerName").value.trim();
    const productCount = Number(productCountInput.value);

    if (customerName === "") {
        validationMessage.textContent =
            "Please enter the Customer Name.";
        return;
    }

    if (
        productCount <= 0 ||
        !Number.isInteger(productCount) ||
        !Number.isFinite(productCount)
    ) {
        validationMessage.textContent =
            "Please enter a valid positive whole number for Number of Products.";
        return;
    }

    if (productsContainer.children.length !== productCount) {
        validationMessage.textContent =
            "Please generate the product fields before calculating the order.";
        return;
    }

    let subtotal = 0;
    let productDetails = "";

    for (let i = 0; i < productCount; i++) {
        const productName =
            document.getElementById(`productName-${i}`).value.trim();

        const price =
            Number(document.getElementById(`productPrice-${i}`).value);

        const quantity =
            Number(document.getElementById(`productQuantity-${i}`).value);

        if (productName === "") {
            validationMessage.textContent =
                `Please enter the Product Name for product ${i + 1}.`;
            return;
        }

        if (!Number.isFinite(price) || price <= 0) {
            validationMessage.textContent =
                `Please enter a valid positive Price for product ${i + 1}.`;
            return;
        }

        if (
            !Number.isFinite(quantity) ||
            quantity <= 0 ||
            !Number.isInteger(quantity)
        ) {
            validationMessage.textContent =
                `Please enter a valid positive whole-number Quantity for product ${i + 1}.`;
            return;
        }

        const itemAmount = calculateItemAmount(price, quantity);

        subtotal += itemAmount;

        productDetails += `
            <div class="summary-line">
                <strong>${i + 1}. ${productName}</strong><br>
                Price: ₱${price.toFixed(2)}<br>
                Quantity: ${quantity}<br>
                Amount: ₱${itemAmount.toFixed(2)}
            </div>
            <hr>
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

    const deliveryOption =
        document.getElementById("deliveryOption").value;

    const deliveryFee = getDeliveryFee(deliveryOption);

    let deliveryType = "";

    switch (deliveryOption) {
        case "1":
            deliveryType = "Store Pickup";
            break;
        case "2":
            deliveryType = "Standard Delivery";
            break;
        case "3":
            deliveryType = "Express Delivery";
            break;
        default:
            deliveryType = "Unknown";
            break;
    }

    const finalAmount = subtotal - discount + deliveryFee;

    orderSummary.innerHTML = `
        <h2>ORDER SUMMARY</h2>

        <p class="summary-line">
            <strong>Customer:</strong> ${customerName}
        </p>

        ${productDetails}

        <p class="summary-line">
            <strong>Subtotal:</strong>
            ₱${subtotal.toFixed(2)}
        </p>

        <p class="summary-line">
            <strong>Discount Rate:</strong>
            ${discountRate}%
        </p>

        <p class="summary-line">
            <strong>Discount Amount:</strong>
            ₱${discount.toFixed(2)}
        </p>

        <p class="summary-line">
            <strong>Delivery Type:</strong>
            ${deliveryType}
        </p>

        <p class="summary-line">
            <strong>Delivery Fee:</strong>
            ₱${deliveryFee.toFixed(2)}
        </p>

        <p class="final-amount">
            Final Amount: ₱${finalAmount.toFixed(2)}
        </p>
    `;
});