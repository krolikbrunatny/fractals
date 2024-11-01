function setup() {
  noLoop();
  createCanvas(800, 800);
}

function draw() {
  triangleFractal(0, 0, 0, height, width, height);
}

function triangleFractal(ax, ay, bx, by, cx, cy) {
  // Draw first (the biggest) triangle
  const first = new Triangle(
    createVector(ax, ay),
    createVector(bx, by),
    createVector(cx, cy),
  );
  first.draw();

  // Start recursion
  fractalize([first]);

  function fractalize(triangles) {
    if (triangles.length > 100) {
      return;
    }

    let acc = [];

    for (const tr of triangles) {
      acc.push(...tr.drawInside());
    }

    fractalize(acc);
  }
}

class Triangle {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  draw() {
    fill(0, 0, 0);
    triangle(this.a.x, this.a.y, this.b.x, this.b.y, this.c.x, this.c.y);
  }

  drawInside() {
    const p = p5.Vector.div(p5.Vector.add(this.a, this.b), 2);
    const q = p5.Vector.div(p5.Vector.add(this.b, this.c), 2);
    const t = p5.Vector.div(p5.Vector.add(this.a, this.c), 2);

    fill(255, 255, 255);
    triangle(p.x, p.y, q.x, q.y, t.x, t.y);

    return [
      new Triangle(this.a, p, t),
      new Triangle(p, this.b, q),
      new Triangle(t, q, this.c),
    ];
  }
}
