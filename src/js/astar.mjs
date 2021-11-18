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

let prueba = [
    [11, 2],
    [9, 5],
    [11, 1],
];

function searchPath(start_node, end_node) {
    const grid = new Grid({
        col: 12,
        row: 10,
    });

    let walls = [
        [5, 2],
        [5, 3],
        [5, 4],
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
        return finalPath
    }

    let paths = getPaths(nodes, start_node)
    finalPath.push(paths.current_best)
    let newArray = nodes.filter((e) => !arrayEquals(e, paths.last_item));

    return getFullTravel(newArray, paths.last_item);
}

let fullTravel = getFullTravel(prueba, [0,8])
fullTravel.forEach(item => console.table( item.forEach(item => console.log(item))))