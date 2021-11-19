const travel = require("../js/astar");

document.querySelector("#sbt_button").addEventListener("click", () => {
  /*let prueba = [
    [9, 0],
    [10, 8],
    [4, 9],
  ];*/

  var frutas= document.getElementById("frutas").checked;
  var verduras= document.getElementById("verduras").checked;
  var carnes= document.getElementById("carnes").checked;
  var limpieza= document.getElementById("limpieza").checked;
  var lacteos= document.getElementById("lacteos").checked;
  var bebidas= document.getElementById("bebidas").checked;
  var cereales= document.getElementById("cereales").checked;
  var pan= document.getElementById("pan").checked;
  var pescado= document.getElementById("pescado").checked;
  var higiene= document.getElementById("higiene").checked;

  var food = [limpieza, higiene, cereales, lacteos, bebidas, carnes, pescado, pan, verduras, frutas];
  var foodPositions = [[4,1],[4,3],[4,5],[4,7],[4,9],[8,1],[8,5],[10,0],[10,6],[9,8]];  
  var goTo = [];

  food.forEach((f,index) => {
    if(f){
      goTo.push(foodPositions[index])
    }
    return goTo;
  });

  console.log(goTo);


  let path = travel.getFullTravel(goTo, [0, 2]);
  console.log(path);
});
