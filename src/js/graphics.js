var W3 = "http://www.w3.org/2000/svg";

function gridId(x, y) {
    return "grid-" + x + "-" + y;
}

function circleId(x, y) {
    return "circle-" + x + "-" + y;
}

function createColor(name, hsl) {
    return {
        name: name,
        hsl: hsl,
    };
}

function createSvg(containerId, svgShape, attributes) {
    var newSvg = document.createElementNS(W3, svgShape);
    attributes.forEach(function(x) {
        newSvg.setAttribute(x[0], x[1]);
    });
    document.getElementById(containerId).appendChild(newSvg);
}

function createSquare(containerId, unit) {
    return (function(x, y, color, id) {
        var squareAttributes = [
            ["id", id],
            ["x", x],
            ["y", y],
            ["width", unit],
            ["height", unit],
            ["fill", color],
            ["opacity", 0.45],
        ];
        createSvg(containerId, "rect", squareAttributes);
    });
}

function createCircle(containerId, radius) {
    return (function(x, y, color, id) {
        var circleAttributes = [
            ["id", id],
            ["cx", x + radius],
            ["cy", y + radius],
            ["r", radius * 0.82],
            ["fill", color],
            ["opacity", 0.9],
        ];
        createSvg(containerId, "circle", circleAttributes);
    });
}

function changeColor(color, id) {
    document.getElementById(id).style.fill = color;
}