// app.js

const form = document.getElementById("form");
const lista = document.getElementById("lista");
const totalSpan = document.getElementById("total");
const ctx = document.getElementById("grafico");

let gastos = JSON.parse(localStorage.getItem("gastos")) || [];
let miGrafico;

// guardar en localStorage
function guardar() {
  localStorage.setItem("gastos", JSON.stringify(gastos));
}

// gráfico
function actualizarGrafico() {
  let comida = 0;
  let transporte = 0;
  let ocio = 0;

  gastos.forEach(gasto => {
    if (gasto.categoria === "Comida") comida += gasto.monto;
    if (gasto.categoria === "Transporte") transporte += gasto.monto;
    if (gasto.categoria === "Ocio") ocio += gasto.monto;
  });

  if (miGrafico) {
    miGrafico.destroy();
  }

  miGrafico = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Comida", "Transporte", "Ocio"],
      datasets: [{
        data: [comida, transporte, ocio]
      }]
    }
  });
}

// mostrar gastos
function render() {
  lista.innerHTML = "";
  let total = 0;

  gastos.forEach((gasto, index) => {
    total += gasto.monto;

    const li = document.createElement("li");

    li.innerHTML = `
      ${gasto.nombre} - $${gasto.monto} (${gasto.categoria})
      <button onclick="eliminar(${index})">❌</button>
    `;

    lista.appendChild(li);
  });

  totalSpan.textContent = total;

  actualizarGrafico();
}

// eliminar
function eliminar(index) {
  gastos.splice(index, 1);
  guardar();
  render();
}

// agregar gasto
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const monto = Number(document.getElementById("monto").value);
  const categoria = document.getElementById("categoria").value;

  gastos.push({
    nombre: nombre,
    monto: monto,
    categoria: categoria
  });

  guardar();
  render();
  form.reset();
});

render();


const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("active");
});