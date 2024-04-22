// Función para cargar productos por página desde el archivo JSON y construir la interfaz
let categoria = localStorage.getItem("category") || ''; // Variable global para almacenar la categoría seleccionada

async function cargarProductosPorPagina(pagina, productosPorPagina, sortBy, orderBy) {
    try {
        // Cargar el archivo JSON de productos
        const response = await fetch('../json/cafe.json');
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

        // Función para buscar productos por categoría
        function buscarPorCategoria(productos, categoria) {
            return productos.filter(producto => producto.category === categoria);
        }

        // Filtrar productos según la categoría seleccionada
        const productosFiltradosPorCategoria = categoria ? buscarPorCategoria(productosPagina, categoria) : productosPagina;




        // Recorrer los productos de la página actual y construir la interfaz
        productosFiltradosPorCategoria.forEach(producto => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');

            const imgContainer = document.createElement('div');
            imgContainer.classList.add('img-container');

            const imagen = document.createElement('img');
            imagen.src = producto.image_url;
            imagen.alt = producto.name;

            const addCartDiv = document.createElement('div');
            addCartDiv.classList.add('addCart');
            addCartDiv.innerHTML = '<i class="fas fa-shopping-cart"></i>';

            const sideIcons = document.createElement('ul');
            sideIcons.classList.add('side-icons');
            sideIcons.innerHTML = `
                <span><i class="fas fa-search" data-id="${producto.id}"></i></span>
                <span><i class="far fa-heart" data-id="${producto.id}"></i></span>
                <span><i class="fas fa-sliders-h" data-id="${producto.id}"></i></span>
            `;

            sideIcons.querySelectorAll('span i').forEach(icon => {
                icon.addEventListener('click', function () {
                    const productId = this.getAttribute('data-id');
                    localStorage.setItem('selectedProductId', productId);
                    window.location.href = 'productDetails.html';
                });
            });

            imgContainer.appendChild(imagen);
            imgContainer.appendChild(addCartDiv);
            imgContainer.appendChild(sideIcons);

            const bottomDiv = document.createElement('div');
            bottomDiv.classList.add('bottom');

            const productName = document.createElement('a');
            productName.href = '#'; // Aquí iría el enlace real
            productName.textContent = producto.name;

            const priceDiv = document.createElement('div');
            priceDiv.classList.add('price');

            const priceSpan = document.createElement('span');
            priceSpan.textContent = '$' + producto.price;

            if (producto.previous_price !== null) {
                const cancelSpan = document.createElement('span');
                cancelSpan.classList.add('cancel');
                cancelSpan.textContent = '$' + producto.previous_price;
                priceDiv.appendChild(cancelSpan);
            }

            priceDiv.appendChild(priceSpan);
            bottomDiv.appendChild(productName);
            bottomDiv.appendChild(priceDiv);

            productDiv.appendChild(imgContainer);
            productDiv.appendChild(bottomDiv);

            productLayout.appendChild(productDiv);
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

// Función para actualizar los productos cuando se cambia el estado del checkbox
function actualizarProductos() {
    cargarProductosPorPagina(1, 15, 'name', 'asc');
}

// Manejador de eventos para el cambio de estado del checkbox
document.querySelectorAll('.block-content input[type="checkbox"]').forEach(function(checkbox) {
    checkbox.addEventListener("change", function() {
        // Verificar si el checkbox está marcado y establecer el valor en localStorage
        if (this.checked) {
            categoria = this.id === "categoryRopa" ? "ropa" : "cafe";
            localStorage.setItem("category", categoria);
        } else {
            categoria = ''; // Limpiar la categoría seleccionada
            localStorage.removeItem("category");
        }
        actualizarProductos(); // Actualizar los productos al cambiar la categoría
    });
});

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
