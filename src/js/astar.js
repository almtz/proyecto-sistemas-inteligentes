const Grid = require("fast-astar").Grid;
const Astar = require("fast-astar").Astar;

/**
 * Check if a array a has equals content that array b.
 *
 * @param a array that we want to compare
 * @param b array that we are comparing against
 * @returns {false|*}
 */
function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

/**
 * Function to get the closest path using the A* algorithm, the function
 * builds the map grid with the Grid class and initiate the algorithm
 *
 * @param start_node The node where the path should start
 * @param end_node The node where the path should end
 * @returns {Array} an array with the nodes that represent the path
 */
function searchPath(start_node, end_node) {
  const grid = new Grid({
    col: 12,
    row: 10,
  });

  /**
   * Array that represent the obstacles on the map
   *
   * @type {number[][]}
   */
  let walls = [
    [0, 2],
    [4, 0],
    [5, 0],
    [6, 0],
    [7, 0],
    [11, 0],
    [1, 2],
    [2, 2],
    [2, 3],
    [2, 5],
    [2, 7],
    [2, 9],
    [4, 0],
    [4, 2],
    [4, 4],
    [4, 6],
    [4, 8],
    [5, 0],
    [5, 2],
    [5, 4],
    [5, 6],
    [5, 8],
    [6, 0],
    [6, 2],
    [6, 4],
    [6, 6],
    [6, 8],
    [7, 0],
    [7, 2],
    [7, 4],
    [7, 6],
    [7, 8],
    [9, 1],
    [9, 2],
    [9, 3],
    [9, 5],
    [9, 6],
    [9, 7],
    [9, 9],
    [10, 9],
    [11, 0],
    [11, 1],
    [11, 2],
    [11, 6],
    [11, 7],
    [11, 8],
    [11, 9],
  ];

  /**
   * Set the obstacles on the map, every node with a value grater than 0, is
   * considered an obstacle
   */
  walls.forEach((item) => {
    grid.set(item, "value", 1); // Values greater than 0 are obstacles
  });
  let astar = new Astar(grid);

  return astar.search(start_node, end_node, {
    rightAngle: false,
    optimalResult: true,
  });
}

/**
 * Finds the closest path between a series of nodes
 *
 * @param nodes Array of nodes that has to be search
 * @param starting_node Node where the path starts
 * @returns {{last_item: *, current_best: *[]}} Object with the new starting node and the closets path find
 */
function getPaths(nodes, starting_node) {
  let current_best = [];

  nodes.forEach((item) => {
    if (current_best.length === 0) {
      current_best = searchPath(starting_node, item);
    } else {
      let temp_path = searchPath(starting_node, item);
      if (temp_path.length <= current_best.length) {
        current_best = temp_path;
      }
    }
  });

  let last_item = current_best[current_best.length - 1];

  return {
    current_best,
    last_item,
  };
}

let finalPath = [];

/**
 * Finds the full path of a travel, where a series of nodes need to be
 * visited.
 *
 * @param nodes Array of the nodes that have to be visited
 * @param start_node Node where the path should start
 * @returns {*[]|*} Array with the complete path of the travel
 */
const getFullTravel = (nodes, start_node) => {
  if (nodes.length === 1) {
    finalPath.push(getPaths(nodes, start_node).current_best);
    finalPath.push(searchPath(nodes[0], [0, 7]));
    return finalPath;
  }

  let paths = getPaths(nodes, start_node);
  finalPath.push(paths.current_best);
  let newArray = nodes.filter((e) => !arrayEquals(e, paths.last_item));

  return getFullTravel(newArray, paths.last_item);
};

exports.getFullTravel = getFullTravel;
