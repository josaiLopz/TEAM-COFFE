const container = document.querySelector(".container");
const coffees = [
  {
    name: "Expresso",
    image: "images/coffee1.jpg"
  },
  {
    name: "Ristrettom",
    image: "images/coffee2.jpg"
  },
  {
    name: "Americano",
    image: "images/coffee3.jpg"
  },
  {
    name: "Lungo",
    image: "images/coffee4.jpg"
  },
  {
    name: "Carrajillo",
    image: "images/coffee5.jpg"
  },
  {
    name: " Cafe con leche",
    image: "images/coffee6.jpg"
  },
  {
    name: "Capuchino",
    image: "images/coffee7.jpg"
  },
  {
    name: "Mocca",
    image: "images/coffee8.jpg"
  },
  {
    name: "Frappé",
    image: "images/coffee9.jpg"
  }
];
const showCoffees = () => {
  let output = "";
  coffees.forEach(
    ({ name, image }) =>
      (output += `
              <div class="card">
                <img class="card--avatar" src=${image} />
                <h1 class="card--title">${name}</h1>
                <a class="card--link" href="datos.html">Taste</a>
              </div>
              `)
  );
  container.innerHTML = output;
};

document.addEventListener("DOMContentLoaded", showCoffees);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("ServiceWorker Registrado"))
      .catch(err => console.log("service worker not registered", err));
  });
}


