import {Grid, Astar} from 'fast-astar'
// See if array a is equal to array b
function arrayEquals(a, b) {
    return (
        Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index])
    );
}

let prueba = [[9,0], [10, 8], [4,9]]

function searchPath(start_node, end_node) {
    const grid = new Grid({
        col: 12,
        row: 10,
    });

    let walls = [
        [4, 0],
        [5, 0],
        [6, 0],
        [7, 0],
        [11,0],
        [2, 2],
        [2, 3],
        [2, 5],
        [2, 7],
        [2, 9],
        [3, 2],
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
        [10,9],
        [11,0],
        [11,1],
        [11,2],
        [11,6],
        [11,7],
        [11,8],
        [11,9],
    ];

    walls.forEach((item) => {
        grid.set(item, "value", 1); // Values greater than 0 are obstacles
    });
    let astar = new Astar(grid);

    return astar.search(start_node, end_node, {
        rightAngle: false,
        optimalResult: true,
    });
}

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

let finalPath = []
export function getFullTravel(nodes, start_node ) {
    if(nodes.length === 1) {
        finalPath.push(getPaths(nodes, start_node).current_best)
        finalPath.push(searchPath(nodes[0], [0, 7]))
        return finalPath
    }

    let paths = getPaths(nodes, start_node)
    finalPath.push(paths.current_best)
    let newArray = nodes.filter((e) => !arrayEquals(e, paths.last_item));

    return getFullTravel(newArray, paths.last_item);
}
