const travel = require("../js/astar");

document.querySelector("#sbt_button").addEventListener("click", () => {
  let prueba = [
    [9, 0],
    [10, 8],
    [4, 9],
  ];

  let path = travel.getFullTravel(prueba, [0, 2]);
  console.log(path);
});
