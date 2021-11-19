const travel = require("../js/astar");
const ipcRenderer = require("electron").ipcRenderer;

document.querySelector("#clr_button").addEventListener("click", () => {
  ipcRenderer.send("reload_message", "reload_window");
});

document.querySelector("#sbt_button").addEventListener("click", () => {
  let frutas = document.getElementById("frutas").checked;
  let verduras = document.getElementById("verduras").checked;
  let carnes = document.getElementById("carnes").checked;
  let limpieza = document.getElementById("limpieza").checked;
  let lacteos = document.getElementById("lacteos").checked;
  let bebidas = document.getElementById("bebidas").checked;
  let cereales = document.getElementById("cereales").checked;
  let pan = document.getElementById("pan").checked;
  let pescado = document.getElementById("pescado").checked;
  let higiene = document.getElementById("higiene").checked;

  let food = [
    limpieza,
    higiene,
    cereales,
    lacteos,
    bebidas,
    carnes,
    pescado,
    pan,
    verduras,
    frutas,
  ];
  let foodPositions = [
    [4, 1],
    [4, 3],
    [4, 5],
    [4, 7],
    [4, 9],
    [8, 1],
    [8, 5],
    [10, 0],
    [10, 6],
    [9, 8],
  ];
  let goTo = [];

  food.forEach((f, index) => {
    if (f) {
      goTo.push(foodPositions[index]);
    }
    return goTo;
  });

  let path = travel.getFullTravel(goTo, [0, 1]);

  let count = 1;
  for (let i = 0; i < path.length; i++) {
    for (let j = 0; j < path[i].length; j++) {
      let id = path[i][j][0] + "-" + path[i][j][1];
      let x = document.getElementById(id);
      x.style.backgroundColor = "purple";
      x.style.color = "white";
      x.innerHTML = x.innerHTML + " " + count;
      count++;
    }
  }
});
