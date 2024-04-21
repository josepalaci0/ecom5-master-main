document.addEventListener("DOMContentLoaded", function() {
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
        const response = await fetch('../json/dataproductosnuevos.json');
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
            if (product.previous_price) {
                previousPriceElement.textContent = `$${product.previous_price}`;
            } else {
                previousPriceElement.textContent = 'N/A';
            }
  
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

           
        } else {
            console.error('No se encontró ningún producto con el ID especificado:', productId);
        }
    } catch (error) {
        console.error('Error al cargar los detalles del producto:', error);
    }
}

