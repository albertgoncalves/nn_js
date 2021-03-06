"use strict";

/*  global calculateEdges, createCircle, createSquare, emptyCoordinate,
        neuralNetwork, normalize, transpose, textColor, unitScale, zip */

function updateText(color, i) {
    for (var j = 0; j < color.n; j++) {
        if (i === j) {
            textColor(color.list[j].name, color.list[j].hsl);
        } else {
            textColor(color.list[j].name, "black");
        }
    }
}

function clickGrid(state, unit, id) {
    var coordinate = id.match(/\d+/g);
    var x = Number(coordinate[0]);
    var y = Number(coordinate[1]);
    if (emptyCoordinate(state.xs, state.ys, x, y)) {
        state.xs.push(x);
        state.ys.push(y);
        state.labels.push(state.color.index);
        createCircle(state.container, unit / 2, "circle-" + x + "-" + y, x, y,
                     state.color.list[state.color.index].hsl);
    }
}

function rectId(x, y) {
    return "rect-" + x + "-" + y;
}

function mapResult(cells, color) {
    var n = cells.length;
    var cell;
    for (var i = 0; i < n; i++) {
        cell = cells[i];
        for (var j = 0; j < color.n; j++) {
            if (cell[2] === j) {
                document.getElementById(rectId(cell[0], cell[1])).style.fill =
                    color.list[j].hsl;
                break;
            }
        }
    }
}

function pressKey(state, key) {
    if (state.color.key.hasOwnProperty(key)) {
        var selection = state.color.key[key];
        if (selection !== state.color.list[state.color.index]) {
            for (var i = 0; i < state.color.n; i++) {
                if (selection === state.color.list[i]) {
                    state.color.index = i;
                    break;
                }
            }
            updateText(state.color, state.color.index);
        }
    } else if ((key === state.key.n) && (state.xs.length > 0)) {
        var xs = normalize(state.xs);
        var ys = normalize(state.ys);
        var testX = zip(unitScale(state.cells.target.xs, xs.mu, xs.sigma),
                        unitScale(state.cells.target.ys, ys.mu, ys.sigma));
        var testY = neuralNetwork(zip(xs.unit, ys.unit), state.labels, testX,
                                  state.params);
        mapResult(
            transpose([state.cells.target.xs, state.cells.target.ys, testY]),
            state.color);
    } else if (key === state.key.l) {
        location.reload();
    }
}

function main() {
    var color = {
        white: {
            name: "white",
            hsl: "hsl(0, 100%, 100%)",
        },
        red: {
            name: "red",
            hsl: "hsl(5, 95%, 75%)",
        },
        green: {
            name: "green",
            hsl: "hsl(145, 40%, 50%)",
        },
        blue: {
            name: "blue",
            hsl: "hsl(205, 85%, 65%)",
        },
        orange: {
            name: "orange",
            hsl: "hsl(35, 85%, 65%)",
        },
    };
    var colors = Object.values(color);
    var resolution = Math.pow(2, 5);
    var unit = document.getElementById("figure").clientWidth / resolution;
    var state = {
        container: "axis",
        cells: calculateEdges(resolution, unit),
        xs: [],
        ys: [],
        labels: [],
        key: {
            l: 76,
            n: 78,
        },
        color: {
            index: 1,
            n: colors.length,
            list: colors,
            key: {
                82: color.red,
                71: color.green,
                66: color.blue,
                79: color.orange,
            },
        },
        params: {
            inputDim: 2,
            outputDim: colors.length,
            hiddenDim: 4,
            lambda: 0.05,
            epsilon: 0.05,
            n: 100,
        },
    };
    updateText(state.color, state.color.index);
    for (var i = 0; i < resolution; i++) {
        var x;
        var y;
        for (var j = 0; j < resolution; j++) {
            x = state.cells.edges[i];
            y = state.cells.edges[j];
            createSquare(state.container, unit, rectId(x, y), x, y,
                         color.white.hsl);
        }
    }
    document.onmouseup = function(e) {
        var id = e.target.id;
        if (id.indexOf("rect-") !== -1) {
            clickGrid(state, unit, id);
        }
    };
    document.onkeydown = function(e) {
        if (e.keyCode) {
            pressKey(state, e.keyCode);
        }
    };
}

main();
