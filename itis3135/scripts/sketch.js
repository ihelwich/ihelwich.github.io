let x, y;
let dx, dy;
let radius = 30;
let r = 255;
let g = 0;
let b = 0;

function setup() {
    createCanvas(600, 400);
    x = width / 2;
    y = height / 2;
    dx = 3;
    dy = 2;
}

function changeColor() {
    r = random(255);
    g = random(255);
    b = random(255);
}

function draw() {
    background(30);

    x += dx;
    y += dy;

    if (x - radius <= 0 || x + radius >= width) {
        dx *= -1;
        changeColor();
    }

    if (y - radius <= 0 || y + radius >= height) {
        dy *= -1;
        changeColor();
    }

    fill(r, g, b);
    noStroke();
    circle(x, y, radius * 2);
}
