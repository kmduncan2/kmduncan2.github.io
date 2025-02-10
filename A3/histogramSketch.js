let table;

function preload() {
  table = loadTable('ecuador_rainfall.csv', 'csv', 'header');
}

function setup() {
  createCanvas(800, 800);

  print(table.getColumn('total_precipitation'));
}

function draw() {
  background(255);

  //stroke(210, 210, 210);

  var count = 0;
  var ypos = 600;
  while (count <= 25) {
    stroke(210);
    strokeWeight(3);
    line(160, ypos, 700, ypos);
    strokeWeight(0);
    text(count.toString(), 140, ypos);
    count += 5;
    ypos -= 80;
  }
  stroke(0);
  strokeWeight(3);
  line(160, 150, 160, 600);
  line(160, 600, 700, 600);

  var rain = table.getColumn('total_precipitation');

  strokeWeight(0);

  const bins = new Map([
    [2230, 0],
    [2530, 0],
    [2830, 0],
    [3130, 0],
    [3430, 0],
    [3730, 0],
    [4030, 0],
    [4330, 0],
    [4630, 0],
    [4930, 0],
    [5230, 0],
    [5530, 0],
  ]);
  for (var i = 0; i < 86; i++) {
    if (rain[i] < 2230) {
      bins.set(2230, bins.get(2230) + 1);
    } else if (rain[i] < 2530) {
      bins.set(2530, bins.get(2530) + 1);
    } else if (rain[i] < 2830) {
      bins.set(2830, bins.get(2830) + 1);
    } else if (rain[i] < 3130) {
      bins.set(3130, bins.get(3130) + 1);
    } else if (rain[i] < 3430) {
      bins.set(3430, bins.get(3430) + 1);
    } else if (rain[i] < 3730) {
      bins.set(3730, bins.get(3730) + 1);
    } else if (rain[i] < 4030) {
      bins.set(4030, bins.get(4030) + 1);
    } else if (rain[i] < 4330) {
      bins.set(4330, bins.get(4330) + 1);
    } else if (rain[i] < 4630) {
      bins.set(4630, bins.get(4630) + 1);
    } else if (rain[i] < 4930) {
      bins.set(4930, bins.get(4930) + 1);
    } else if (rain[i] < 5230) {
      bins.set(5230, bins.get(5230) + 1);
    } else {
      bins.set(5530, bins.get(5530) + 1);
    }
  }

  var scale = 2000;
  var sub = 30;
  for (var i = 2230; i <= 5600; i += 300) {
    fill(0, 100, 200);
    strokeWeight(2);
    rect(160 + sub, 600, 40, bins.get(i) * -15);
    fill(0);
    strokeWeight(0);
    if (scale < 6000) {
      var xpos = 150 + sub * 1.7;
      line(xpos, 610, xpos, 600);
      text(scale.toString(), xpos, 620);
      scale += 500;
    }
    sub += 40;
  }

  fill(0, 0, 0);
  strokeWeight(0);

  text('Total Percipitation (mm)', 380, 650);
  text('x', 705, 605);
  text('y', 140, 150);

  push();
  let angle1 = radians(270);
  translate(90, 400);
  rotate(angle1);
  text('Count', 0, 0);
  pop();

  textSize(15);
  text(
    'Total Precipitation in Ecuador between 1940 & 2024',
    265,
    120,
  );
  textSize(12);
}
