// Función para cargar productos por página desde el archivo JSON y construir la interfaz
async function cargarProductosPorPagina(pagina, productosPorPagina, sortBy, orderBy) {
    try {
        // Cargar el archivo JSON de productos
        const response = await fetch('../json/dataproductos.json');
        const data = await response.json();

        // Aplicar filtros de ordenamiento y dirección
        let productosFiltrados = [...data];
        if (sortBy === 'name') {
            productosFiltrados.sort((a, b) => orderBy === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
        } else if (sortBy === 'price') {
            productosFiltrados.sort((a, b) => orderBy === 'asc' ? a.price.localeCompare(b.price) : b.price.localeCompare(a.price));
        } else if (sortBy === 'relevance') {
            // Implementar lógica de relevancia si es necesario
        } else if (sortBy === 'newness') {
            productosFiltrados.sort((a, b) => orderBy === 'asc' ? a.createdAt - b.createdAt : b.createdAt - a.createdAt);
        }

        // Calcular el índice inicial y final de los productos para la página actual
        const startIndex = (pagina - 1) * productosPorPagina;
        const endIndex = pagina * productosPorPagina;

        // Obtener los productos para la página actual
        const productosPagina = productosFiltrados.slice(startIndex, endIndex);

        // Seleccionar el contenedor de productos
        const productLayout = document.querySelector('.product-layout');

        // Limpiar el contenido previo del contenedor
        productLayout.innerHTML = '';

        // Recorrer los productos de la página actual y construir la interfaz
        productosPagina.forEach(producto => {
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
        });

        // Calcular el número total de páginas
        const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

        // Construir la paginación
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';
        for (let i = 1; i <= totalPaginas; i++) {
            const span = document.createElement('span');
            span.textContent = i;
            span.addEventListener('click', () => {
                cargarProductosPorPagina(i, productosPorPagina, sortBy, orderBy);
            });
            pagination.appendChild(span);
        }
    } catch (error) {
        console.error('Error cargando productos por página:', error);
    }
}

// Manejador de eventos para el envío del formulario de filtros
document.getElementById('filter-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const sortBy = document.getElementById('sort-by').value;
    const orderBy = document.getElementById('order-by').value;
    cargarProductosPorPagina(1, 15, sortBy, orderBy);
});

// Cargar productos por defecto al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarProductosPorPagina(1, 15, 'name', 'asc');
});
