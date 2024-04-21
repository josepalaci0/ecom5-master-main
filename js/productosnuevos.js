document.addEventListener("DOMContentLoaded", function() {
  async function cargarNuevosProductos() {
      try {
          const response = await fetch('../json/dataproductosnuevos.json');
          const data = await response.json();
          const productLayout = document.querySelector('.product-layout');
          productLayout.innerHTML = '';
    
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
              sideIcons.innerHTML = `
                  <span><i class="fas fa-search" data-id="${producto.id}"></i></span>
                  <span><i class="far fa-heart" data-id="${producto.id}"></i></span>
                  <span><i class="fas fa-sliders-h" data-id="${producto.id}"></i></span>
              `;
    
              sideIcons.querySelectorAll('span i').forEach(icon => {
                  icon.addEventListener('click', function() {
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
      } catch (error) {
          console.error('Error cargando nuevos productos:', error);
      }
  }

  cargarNuevosProductos();
});
