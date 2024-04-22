document.addEventListener("DOMContentLoaded", function () {
    // Obtener el ID del producto almacenado en el localStorage
    const productId = localStorage.getItem('selectedProductId');

    if (productId) {
        // Cargar detalles del producto con el ID especificado
        loadProductDetails(productId);
    } else {
        console.error('No se encontró ningún ID de producto en el localStorage.');
    }
});

async function loadProductDetails(productId) {
    try {
        // Fetch product details JSON
        const response = await fetch('../json/cafe.json');
        const productData = await response.json();

        // Buscar el producto con el ID especificado
        const product = productData.find(product => product.id === parseInt(productId));

        if (product) {
            // Mostrar los detalles del producto
            document.getElementById('main-image').src = product.image_url;
            document.getElementById('product-name').textContent = product.name;
            document.getElementById('product-price').textContent = `$${product.price}`;
            document.getElementById('product-description').textContent = product.details;

            // Mostrar el precio anterior si está disponible
            const previousPriceElement = document.getElementById('previous-price');
            previousPriceElement.textContent = product.previous_price ? `$${product.previous_price}` : 'N/A';

            // Mostrar tallas disponibles (opciones de color)
            const selectSize = document.getElementById('select-size');
            selectSize.innerHTML = '';

            // Agregar opciones de color predeterminadas
            const colors = ['Red', 'Blue', 'Green', 'Black']; // Ejemplo de colores
            colors.forEach(color => {
                const option = document.createElement('option');
                option.value = color;
                option.textContent = color;
                selectSize.appendChild(option);
            });

            // Agregar casilla para seleccionar la cantidad
            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.value = '1'; // Valor inicial
            quantityInput.min = '1'; // Valor mínimo permitido
            quantityInput.placeholder = 'Quantity';
            quantityInput.classList.add('quantity-input');
            document.querySelector('.form').appendChild(quantityInput);

            // Opcional: Agregar enlace para agregar al carrito
            const addToCartLink = document.createElement('a');
            addToCartLink.href = '#';
            addToCartLink.textContent = 'Add To Cart';
            addToCartLink.classList.add('addCart');
            addToCartLink.addEventListener('click', () => {
                const selectedSize = selectSize.value;
                const selectedQuantity = quantityInput.value;
                const productToAdd = { ...product, size: selectedSize, quantity: parseInt(selectedQuantity) };
                console.log('Producto agregado al carrito:', productToAdd);
                addToCart(productToAdd);
            });
            document.querySelector('.form').appendChild(addToCartLink);

        } else {
            console.error('No se encontró ningún producto con el ID especificado:', productId);
        }
    } catch (error) {
        console.error('Error al cargar los detalles del producto:', error);
    }
}

// Función para agregar un producto al carrito
function addToCart(product) {
    // Obtener carrito del localStorage o crear uno vacío
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Verificar si el producto ya está en el carrito
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
        // Si el producto ya está en el carrito, actualizar la cantidad
        cart[existingProductIndex].quantity += product.quantity;
    } else {
        // Si el producto no está en el carrito, agregarlo
        cart.push(product);
        console.log(cart);
    }

    // Actualizar el carrito en el localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Mostrar mensaje de éxito
    alert('Producto agregado al carrito.');

    // Opcional: redireccionar a la página del carrito
     window.location.href = 'cart.html';
}

