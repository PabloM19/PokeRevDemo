function toggleProductInCart(productName, price, imageUrl, buttonElement) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let existingItem = cartItems.find(item => item.name === productName);

    if (existingItem) {
        // Eliminar del carrito si ya está en él
        cartItems = cartItems.filter(item => item.name !== productName);
        buttonElement.textContent = "Add to cart";
        buttonElement.style.backgroundColor = ""; // Restablecer el color de fondo
        buttonElement.style.color = ""; // Restablecer el color del texto
    } else {
        // Añadir al carrito si no está en él
        cartItems.push({ name: productName, price: price, imageUrl: imageUrl, quantity: 1 });
        buttonElement.textContent = "Remove from cart";
        buttonElement.style.backgroundColor = "#ccc"; // Cambiar color de fondo para indicar que está en el carrito
        buttonElement.style.color = "#000"; // Cambiar color del texto
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartUI();
    updateProductCounters();
}

function updateProductCounters() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    document.querySelectorAll('.product-counter').forEach(counter => {
        let productName = counter.closest('.card').querySelector('a[data-product-name]').getAttribute('data-product-name');
        let item = cartItems.find(item => item.name === productName);

        if (item) {
            counter.style.display = 'flex';
            counter.querySelector('.item-count').textContent = item.quantity;
        } else {
            counter.style.display = 'none';
        }
    });
}


// Funciones para gestionar el carrito de compras
function addToCart(productName, price, imageUrl) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let existingItem = cartItems.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ name: productName, price: price, imageUrl: imageUrl, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartUI();
}

function decreaseItem(productName) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let itemIndex = cartItems.findIndex(item => item.name === productName);

    if (itemIndex > -1) {
        if (cartItems[itemIndex].quantity > 1) {
            cartItems[itemIndex].quantity -= 1;
        } else {
            cartItems.splice(itemIndex, 1);
        }
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartUI();
}

function increaseItem(productName) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let existingItem = cartItems.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity += 1;
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartUI();
}

function updateCartUI() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let cartCount = document.getElementById('cart-count');
    let cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let totalAmount = 0;

    cartItems.forEach(item => {
        totalAmount += item.price * item.quantity;

        let cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <div class="cart-item-details">
                <span>${item.name}</span>
                <span><b>$${item.price}</b></span>
                <div class="product-counter">
                    <button class="btn btn-dark btn-sm" style="background:rgba(0,0,0,0.7); border:none;" onclick="decreaseItem('${item.name}')">-</button>
                    <span>${item.quantity}</span>
                    <button class="btn btn-dark btn-sm" style="background:rgba(0,0,0,0.7); border:none;" onclick="increaseItem('${item.name}')">+</button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
    });

    cartCount.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);

    let totalAmountHeader = document.getElementById('total-amount-header');
    if (totalAmountHeader) {
        totalAmountHeader.textContent = ``;
    } else {
        totalAmountHeader = document.createElement('span');
        totalAmountHeader.id = 'total-amount-header';
        totalAmountHeader.textContent = ``;
        cartCount.parentElement.appendChild(totalAmountHeader);
    }

    if (cartItems.length > 0) {
        let totalAmountFooter = document.createElement('div');
        totalAmountFooter.className = 'cart-total';
        totalAmountFooter.innerHTML = `
            <div class="cart-total-amount" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <div style="display: flex; gap: 10px; margin-top:5%;">
                    <span>Total:</span>
                    <span>$${totalAmount.toFixed(2)}</span>
                </div>
                <button id="checkout-button" class="btn btn-outline-dark mt-3">Checkout</button>
            </div>
        `;
        cartItemsContainer.appendChild(totalAmountFooter);
        
        document.getElementById('checkout-button').addEventListener('click', () => {
            window.location.href = 'checkout.html';
        });
    }
    

    updateProductCounters();
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    updateProductCounters();
});


function filterProducts(filterType) {
    // Aquí puedes agregar la lógica para filtrar productos según el tipo (popular, new, etc.)
    console.log(`Filtering products by: ${filterType}`);
}

document.addEventListener('DOMContentLoaded', updateCartUI);
