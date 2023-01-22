// Comprobamos si hay datos de contacto previos
let contactos = JSON.parse(localStorage.getItem("contactos"));
if (contactos === null) {
  contactos = [];
}
console.log(contactos)

//Pintar a las personas interesadas en cada gato en cada gato
const pintarInteresados = () => {
  const contenedorInteresados = document.getElementById("contactos-contenedor");
  contactos.forEach(persona => {
    // Crear elemento div para el interesado en adoptar
    const div = document.createElement("div");
    div.classList.add("caja");
    div.innerHTML += `
        <div class="card-content">
          <p>Nombre Interesado: ${persona.nombre.toUpperCase()}</p>
          <p>Gato a adoptar: ${persona.gato}</p>
        </div>
      `;
    // Añadir elemento div del interesado al contenedor
    contenedorInteresados.appendChild(div);
  });
};

let gatoAdoptado = 0;

// Crear contenido de la ventana modal
const modal = document.createElement("div");
modal.setAttribute("data-closable", "");
modal.classList.add("modal");
modal.style.display = "none";
modal.innerHTML = `
  <div class="modal-content">
    <span class="close-button">&times;</span>
    <p>Por favor, completa el siguiente formulario para adoptar a este gato:</p>
    <form class="adoption-form">
      <label for="nombre">Nombre:</label><br>
      <input type="text" id="nombre" name="nombre"><br>
      <label for="apellido">Apellido:</label><br>
      <input type="text" id="apellido" name="apellido"><br>
      <label for="correo">Correo electrónico:</label><br>
      <input type="email" id="correo" name="correo"><br>
      <label for="telefono">Teléfono:</label><br>
      <input type="tel" id="telefono" name="telefono"><br>
      <input type="submit" value="Enviar">
    </form>
  </div>
`;

// Añadir ventana modal a la página
document.body.appendChild(modal);

const pintarGatos = (gatos) => {
  const contenedor = document.getElementById("gatos-contenedor");
  gatos.forEach(gato => {
    // Crear elemento div para el gato
    const div = document.createElement("div");
    div.classList.add("caja");
    div.innerHTML += `
        <div>
          <img class="card-image" src=${gato.imgURL} alt=${gato.nombre}>
        </div>
        <div class="card-content">
          <p class="titulos">${gato.nombre.toUpperCase()}</p>
          <p>Raza: ${gato.raza}</p>
          <p>País de origen: ${gato.paisOrigen}</p>
          <p>Nivel adaptabilidad: ${gato.adaptabilidad}</p>
          <p>Nivel amistoso: ${gato.amistoso}</p>
          <p><a href="${gato.wikiURL}" target="_blank">Más info de la raza</a></p>
        </div>
      `;

    // Crear botón de adopción
    const button = document.createElement("button");
    button.innerHTML = "Adoptar";
    button.classList.add("adopt-button");
    button.setAttribute('id',gato.nombre.toUpperCase());
    div.appendChild(button);

    // Añadir evento de clic al botón de adopción para mostrar la ventana modal
    button.addEventListener("click", () => {
      modal.style.display = "block";
      gatoAdoptado = gato.nombre.toUpperCase();
      console.log(gatoAdoptado);
    });

    // Añadir evento de clic al botón de cierre para ocultar la ventana modal
    const closeButton = modal.querySelector(".close-button");
    closeButton.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Añadir elemento div del gato al contenedor
    contenedor.appendChild(div);
  });
};


const adoptionForm = modal.querySelector(".adoption-form");
adoptionForm.addEventListener("submit", event => {
  // Prevenir el envío del formulario
  event.preventDefault();

  // Obtener valores de los campos del formulario
  const nombre = adoptionForm.nombre.value;
  const apellido = adoptionForm.apellido.value;
  const correo = adoptionForm.correo.value;
  const telefono = adoptionForm.telefono.value;

  // Validar que el correo y el teléfono sean válidos
  if (!correo.includes("@")) {
    alert("Por favor, ingrese un correo electrónico válido.");
    return;
  }
  if (telefono.length !== 10) {
    alert("Por favor, ingrese un teléfono válido de 10 dígitos.");
    return;
  }

  // Crear un nuevo objeto con la información de contacto
  const contactoNuevo = {
    nombre: nombre,
    apellido: apellido,
    correo: correo,
    telefono: telefono,
    gato: gatoAdoptado,
  };

  contactos.push(contactoNuevo); // hacemos un push para tener todos los pretendientes anotados
  localStorage.setItem("contactos", JSON.stringify(contactos)); // almacenamos en memoria local los datos del formulario

  // Si todos los campos son válidos, mostrar mensaje de éxito y recargar la página
  alert("¡Gracias por adoptar a un gatito! En breve nos contactaremos para finalizar el proceso. Esperamos que tengan una buena vida juntos.");

  window.location.reload();
});

// Añadir evento de clic al botón de cierre para ocultar la ventana modal y mostrar el mensaje de incentivo
const closeButton = modal.querySelector(".close-button");
closeButton.addEventListener("click", () => {
  modal.style.display = "none";
  alert("¡Esperamos que pronto puedas adoptar un gatito y darle un hogar!");
});

document.addEventListener('DOMContentLoaded', () => {
  pintarInteresados();

  Toastify({
    text: "Espera mientras buscamos gatos en adopción",
    className: "info",
    duration: 4000,
    style: {
      background: "#14213D",
    },
    offset: {
      x: 10,
      y: 50,
    },
  }).showToast();
});