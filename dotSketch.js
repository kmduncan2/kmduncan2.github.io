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

  stroke(210, 210, 210);

  var count = 0;
  for (var i = 600; i > 160; i -= 50) { //creating the lines on the chart
    strokeWeight(3);
    line(160, i, 610, i);
    strokeWeight(0);
    text(count.toString(), 120, i);
    count += 500;
  }

  var rain = table.getColumn('total_precipitation');
  var year = table.getColumn('Year');

  strokeWeight(0);

  //creating the dots
  for (var i = 55; i < 66; i++) {
    fill(0, 130, 200);
    var help = rain[i];
    help /= -10;
    help += 600; //up 600 since the rects had y = 600
    circle(20 * (2 * i) - 2000, help, 20);
    fill(0, 0, 0);
    text(year[i], 20 * (i + (i - 1)) - 2002, 620);
  }

  //creating the axes
  stroke('black');
  strokeWeight(5);

  line(160, 600, 160, 150);
  line(160, 600, 610, 600);

  fill(0, 0, 0);
  strokeWeight(0);

  text('Year', 380, 650);

  push();
  let angle1 = radians(270);
  translate(90, 420);
  rotate(angle1);
  text('Total Percipitation (mm)', 0, 0);
  pop();

  textSize(15);
  text(
    'Total Precipitation in Ecuador between 1995 & 2005',
    215,
    120,
  );
  textSize(12);
}
