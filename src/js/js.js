let configTeclado = { prevent_repeat: true };
let eventoTeclado = new window.keypress.Listener(this, configTeclado);

function eleccion(jugada) {
  let resultado = "";
  if (jugada == 1) {
    resultado = "Piedra";
  } else if (jugada == 2) {
    resultado = "Papel";
  } else if (jugada == 3) {
    resultado = "Tijera";
  } else {
    resultado = "MAL ELEGIDO";
  }
  return resultado;
}
// 1 es piedra, 2 es papel, 3 es tijera
let jugador = 0;
let pc = 0;
let currentIndex = 0;
const vector = ["Piedra", "Papel", "Tijera"];

let intervalo = setInterval(()=>{
  
  const imgJ = document.getElementById("imagenJ");
  const imgE = document.getElementById("imagenE");

  // Cambia la imagen actual
  imgJ.setAttribute("src", `src/img/${vector[currentIndex]}.svg`);
  imgJ.style.transform = "scaleX(-1)";
  imgE.setAttribute("src", `src/img/${vector[Math.floor(Math.random() * vector.length)]}.svg`);

  currentIndex = (currentIndex + 1) % vector.length;
}, 500);
// Llama a la función cada 500ms para cambiar la imagen


function validacion() {
  const mensaje = document.getElementById("mensaje");
  const imgJ = document.getElementById("imagenJ");
  const imgE = document.getElementById("imagenE");
 
  imgJ.setAttribute("src", `src/img/${eleccion(jugador)}.svg`);
  //imgJ.style.transform = "scaleX(-1)";
  imgJ.setAttribute("alt", eleccion(jugador));

  imgE.setAttribute("src", `src/img/${eleccion(pc)}.svg`);
  imgE.setAttribute("alt", eleccion(pc));

  console.log("Pc elige: " + eleccion(pc));
  console.log("Tu eliges: " + eleccion(jugador));

  function mensajef (texto) {
    clearInterval(intervalo);
    mensaje.innerHTML = texto;
    mensaje.style.display = "block";
    eventoTeclado.stop_listening();
    clearInterval(intervalo);
    setTimeout(function () {
      eventoTeclado.listen();
      mensaje.innerHTML = "";
      mensaje.style.display = "none"
      intervalo = setInterval(()=>{
        const imgJ = document.getElementById("imagenJ");
        const imgE = document.getElementById("imagenE");
        imgJ.setAttribute("src", `src/img/${vector[currentIndex]}.svg`);
        imgJ.style.transform = "scaleX(-1)";
      
        imgE.setAttribute("src", `src/img/${vector[Math.floor(Math.random() * vector.length)]}.svg`);
      
        currentIndex = (currentIndex + 1) % vector.length;
      }, 300);
    }, 3000);
  }

  if (pc == jugador) {
    mensajef("EMPATE");
  } else if (jugador == 1 && pc == 3 || jugador == 2 && pc == 1 || jugador == 3 && pc == 2) {
    mensajef("¡GANASTE!");
  } else {
    mensajef("¡PERDISTE!");
  }
}

eventoTeclado.simple_combo("a", function () {
  pc = Math.floor(Math.random() * (3 - 1 + 1) + 1);
  jugador = 1;
  validacion();
});
eventoTeclado.simple_combo("s", function () {
  pc = Math.floor(Math.random() * (3 - 1 + 1) + 1);
  jugador = 2;
  validacion();
});
eventoTeclado.simple_combo("d", function () {
  pc = Math.floor(Math.random() * (3 - 1 + 1) + 1);
  jugador = 3;
  validacion();
});
