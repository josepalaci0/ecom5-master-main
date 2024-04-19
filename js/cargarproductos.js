// cargarProductos.js

// Importar la función loadProductDetails desde el archivo loadProductDetails.js
const loadProductDetails = require('./loadProductDetails');

// Function to load product details based on JSON data
async function cargarProductos() {
    try {
        // Cargar el archivo JSON de productos
        const response = await fetch('../json/dataproductos.json');
        const data = await response.json();

        // Seleccionar el contenedor de productos
        const productLayout = document.querySelector('.product-layout');

        // Recorrer los datos recibidos y construir la interfaz
        data.forEach(producto => {
            // Crear el contenedor del producto
            const productContainer = document.createElement('div');
            productContainer.classList.add('product');

            // Crear la parte de la imagen
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('img-container');
            const imagen = document.createElement('img');
            imagen.src = producto.image;
            imagen.alt = producto.name;
            imgContainer.appendChild(imagen);

            // Añadir el botón de agregar al carrito
            const addCart = document.createElement('div');
            addCart.classList.add('addCart');
            const iconoCarrito = document.createElement('i');
            iconoCarrito.classList.add('fas', 'fa-shopping-cart');
            addCart.appendChild(iconoCarrito);
            imgContainer.appendChild(addCart);

            // Añadir los íconos secundarios
            const sideIcons = document.createElement('ul');
            sideIcons.classList.add('side-icons');
            const iconosClasses = ['fa-search', 'fa-heart', 'fa-sliders-h'];
            iconosClasses.forEach(iconoClass => {
                const span = document.createElement('span');
                const icono = document.createElement('i');
                icono.classList.add('fas', iconoClass);
                span.appendChild(icono);
                sideIcons.appendChild(span);
            });
            imgContainer.appendChild(sideIcons);

            // Añadir la parte inferior del producto (nombre y precio)
            const bottom = document.createElement('div');
            bottom.classList.add('bottom');
            const enlace = document.createElement('a');
            enlace.href = producto.detailsUrl;
            enlace.textContent = producto.name;
            const precio = document.createElement('div');
            precio.classList.add('price');
            const spanPrecio = document.createElement('span');
            spanPrecio.textContent = producto.price;
            precio.appendChild(spanPrecio);
            bottom.appendChild(enlace);
            bottom.appendChild(precio);

            // Añadir las partes al contenedor del producto
            productContainer.appendChild(imgContainer);
            productContainer.appendChild(bottom);

            // Agregar el producto al contenedor de productos
            productLayout.appendChild(productContainer);

            // Agregar evento click al contenedor del producto para cargar detalles del producto
            productContainer.addEventListener('click', () => {
                loadProductDetails(producto.id);
            });
        });
    } catch (error) {
        console.error('Error cargando productos:', error);
    }
}

// Llamar a la función cargarProductos cuando se cargue el DOM
document.addEventListener("DOMContentLoaded", cargarProductos);
