
  document.addEventListener("DOMContentLoaded", function() {
    // Obtener el elemento del contador
    const countElement = document.querySelector('.count');

    // Función para actualizar el contador
    function updateCartCount() {
      // Obtener el carrito del localStorage
      const cart = JSON.parse(localStorage.getItem('cart')) || [];

      // Calcular la cantidad total de productos en el carrito
      const totalCount = cart.reduce((total, product) => total + product.quantity, 0);

      // Actualizar el contenido del contador
      countElement.textContent = totalCount;
    }

    // Actualizar el contador al cargar la página
    updateCartCount();

    // Agregar evento de clic al icono del carrito para redirigir al usuario a la página del carrito
    const cartIcon = document.querySelector('.icons');
    cartIcon.addEventListener('click', function() {
      window.location.href = 'cart.html';
    });
  });
