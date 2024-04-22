document.addEventListener("DOMContentLoaded", function () {
    // Cargar elementos del carrito al cargar la página
    loadCartItems();
});

function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    const cartTable = document.querySelector('.container.cart table');
    const subtotalCell = document.getElementById('subtotal');
    const taxCell = document.getElementById('tax');
    const totalCell = document.getElementById('total');

    cartTable.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos elementos

    let subtotal = 0;

    cartItems.forEach(item => {
        const { id, name, price, quantity } = item;

        // Calcular subtotal del artículo
        const itemSubtotal = price * quantity;
        subtotal += itemSubtotal;

        // Crear fila para el artículo en el carrito
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="cart-info">
                    <img src="./images/product${id}.jpg" alt="${name}" />
                    <div>
                        <p>${name}</p>
                        <span>Price: $${price.toFixed(2)}</span>
                        <br />
                        <a href="#" data-id="${id}" class="remove">Remove</a>
                    </div>
                </div>
            </td>
            <td>
                <input type="number" value="${quantity}" min="1" class="quantity-input" data-id="${id}">
            </td>
            <td>$${itemSubtotal.toFixed(2)}</td>
        `;

        cartTable.appendChild(row);
    });

    // Actualizar subtotal, impuestos y total
    const tax = subtotal * 0.1; // Suponiendo un impuesto del 10%
    const total = subtotal + tax;

    subtotalCell.textContent = `$${subtotal.toFixed(2)}`;
    taxCell.textContent = `$${tax.toFixed(2)}`;
    totalCell.textContent = `$${total.toFixed(2)}`;

    // Agregar evento para eliminar elementos del carrito
    const removeButtons = document.querySelectorAll('.remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', removeFromCart);
    });

    // Agregar evento para actualizar la cantidad de productos en el carrito
    const quantityInputs = document.querySelectorAll('.quantity-input');
    quantityInputs.forEach(input => {
        input.addEventListener('change', updateQuantity);
    });
}

function removeFromCart(event) {
    const itemId = parseInt(event.target.dataset.id);
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    cartItems = cartItems.filter(item => item.id !== itemId);

    localStorage.setItem('cart', JSON.stringify(cartItems));

    loadCartItems();
}

function updateQuantity(event) {
    const itemId = parseInt(event.target.dataset.id);
    const newQuantity = parseInt(event.target.value);

    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    cartItems.forEach(item => {
        if (item.id === itemId) {
            item.quantity = newQuantity;
        }
    });

    localStorage.setItem('cart', JSON.stringify(cartItems));

    loadCartItems();
}
