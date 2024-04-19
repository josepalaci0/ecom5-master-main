// Función para cargar los nuevos productos desde el archivo JSON


  // Agregar un event listener para el evento 'DOMContentLoaded'
document.addEventListener("DOMContentLoaded", function() {
    // Llamar a la función para cargar los nuevos productos cuando el DOM esté listo
    async function cargarNuevosProductos() {
        try {
          // Cargar el archivo JSON de productos
          const response = await fetch('../json/dataproductosnuevos.json');
          const data = await response.json();
      
          // Seleccionar el contenedor de productos
          const productLayout = document.querySelector('.product-layout');
      
          // Limpiar el contenedor
          productLayout.innerHTML = '';
      
          // Recorrer los datos recibidos y construir la interfaz
          data.forEach(producto => {
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
            sideIcons.innerHTML = '<span><i class="fas fa-search"></i></span><span><i class="far fa-heart"></i></span><span><i class="fas fa-sliders-h"></i></span>';
      
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
      
            // Si hay un precio anterior, agregarlo como cancelado
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
        } catch (error) {
          console.error('Error cargando nuevos productos:', error);
        }
      }
    cargarNuevosProductos();
});

  
  // Llamar a la función para cargar los nuevos productos cuando se cargue la página
  window.onload = cargarNuevosProductos;
  