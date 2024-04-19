function toggleOnHover(formSelector, inputSelector, loginSelector) {
  const form = document.querySelector(formSelector);
  const input = document.querySelector(inputSelector);
  const login = document.querySelector(loginSelector);

  // Mostrar el input y ocultar el login al pasar el cursor sobre el formulario
  form.addEventListener('mouseenter', () => {
    input.style.display = 'block';
    login.classList.add('login-hidden'); // Ocultar el login
  });

  // Ocultar el input y mostrar el login al quitar el cursor del formulario
  form.addEventListener('mouseleave', () => {
    input.style.display = 'none';
    login.classList.remove('login-hidden'); // Mostrar el login
  });
}

// Llamar a la función toggleOnHover con los selectores correspondientes
toggleOnHover('.search-form', '.input-field', '#login');
