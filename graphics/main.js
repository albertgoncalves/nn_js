// const blue        = "hsl(205, 85%, 65%)";
// const red         = "hsl(  5, 95%, 75%)";
const colorA      = randomHsl();
const colorB      = randomHsl();
const colorC      = randomHsl();
const len         = document.getElementById("figure").clientWidth;
const containerId = "axis";
const res         = Math.pow(2, 4);
const unit        = len / res;
const edges       = range(res).map((x) => x * unit);
const squareInit  = createSquare(containerId, unit);
const colorFun    = (x, y) => (x + y) >= len ? colorA
                                             : colorB;
const grid        = iterGrid(edges, edges);
const drawGrid    = (x, y) => squareInit(x, y, colorFun(x, y), rectId(x, y));
const colorGrid   = (x, y) => changeColor(randomHsl(), rectId(x, y));

grid(drawGrid);
// grid(colorGrid);
