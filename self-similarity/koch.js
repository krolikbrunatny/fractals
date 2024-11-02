function setup() {
  noLoop();
  noStroke();
  angleMode(DEGREES);
  createCanvas(400, 400);
}

function draw() {
  background(220, 220, 220);
  translate(width / 2, height / 2);

  kochXY(0, 0);

  rotate(180);
  kochXY(0, 0);
}

function kochXY(x, y) {
  koch(x - 300, y, x + 300, y);
}

function koch(ax, ay, bx, by) {
  let lines = [new Line(createVector(ax, ay), createVector(bx, by))];

  run();

  function run() {
    if (lines.length > 1000) {
      return;
    }

    let acc = [];

    for (const l of lines) {
      acc.push(...l.generate());
    }

    lines = acc;

    run();
  }

  for (const l of lines) {
    l.draw();
  }
}

class Line {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  draw() {
    stroke(0);
    strokeWeight(1);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }

  generate() {
    // line width
    const d = p5.Vector.dist(this.a, this.b);

    // points on line
    const aToB = p5.Vector.mult(p5.Vector.sub(this.b, this.a), 1 / 3);
    const left = p5.Vector.add(this.a, aToB);
    const right = p5.Vector.sub(this.b, aToB);

    // middle point
    const c = p5.Vector.add(p5.Vector.div(p5.Vector.add(this.a, this.b), 2));
    const perp = createVector(aToB.y, -aToB.x)
      .normalize()
      .mult(aToB.mag() * sin(60));
    c.add(perp);

    // return lines
    return [
      new Line(this.a, left),
      new Line(left, c),
      new Line(c, right),
      new Line(right, this.b),
    ];
  }
}
