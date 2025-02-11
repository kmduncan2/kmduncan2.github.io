let table;

function preload() {
  table = loadTable('ecuador_rainfall.csv', 'csv', 'header');
}

function setup() {
  createCanvas(800, 800);

  print(table.getColumn('population_growth_rate'));
}

function draw() {
  background(255);

  text('Population Growth Rate (%)', 360, 600);

  textSize(15);
  text(
    'Population Growth in Ecuador between 1940 & 2024',
    275,
    130,
  );
  textSize(12);

  var pop = table.getColumn('population_growth_rate');
  var min = 20;
  var max = 0;
  var median = 0;
  var q1 = 0;
  var q3 = 0;
  const rates = []; //need to sort
  stroke(0);
  strokeWeight(3);

  for (var i = 0; i < 87; i++) {
    var rate = pop[i];
    if (rate < min) {
      min = rate;
    }
    if (rate > max) {
      max = rate;
    }
    rates[i] = rate;
  }
  rates.sort();

  let check = rates.length / 2;
  if (check % 1 != 0) {
    let lower = check - 0.5;
    let upper = check + 0.5;
    median =
      parseFloat(rates[lower]) + parseFloat(rates[upper]);
    median /= 2;
    var checkq1 = lower / 2;
    if (checkq1 % 1 != 0) {
      var low = checkq1 - 0.5;
      var high = checkq1 + 0.5;
      q1 = parseFloat(rates[low]) + parseFloat(rates[high]);
      q1 /= 2;
    } else {
      q1 = parseFloat(rates[checkq1]);
    }
    var newind = rates.length + lower;
    var checkq3 = newind / 2;
    if (checkq3 % 1 != 0) {
      var low = checkq3 - 0.5 + lower;
      var high = checkq3 + 0.5 + lower;
      q3 = parseFloat(rates[low]) + parseFloat(rates[high]);
      q3 /= 2;
    } else {
      q3 = parseFloat(rates[checkq3]);
    }
  } else {
    median = parseFloat(rates[check]);
    var checkq1 = check / 2;
    if (checkq1 % 1 != 0) {
      var low = checkq1 - 0.5;
      var high = checkq1 + 0.5;
      q1 = parseFloat(rates[low]) + parseFloat(rates[high]);
      q1 /= 2;
    } else {
      q1 = parseFloat(rates[checkq1]);
    }
    var newind = rates.length + check;
    var checkq3 = newind / 2;
    if (checkq3 % 1 != 0) {
      var low = checkq3 - 0.5 + check;
      var high = checkq3 + 0.5 + check;
      q3 = parseFloat(rates[low]) + parseFloat(rates[high]);
      q3 /= 2;
    } else {
      q3 = parseFloat(rates[checkq3]);
    }
  }

  fill(255);
  rect(290, 525, 300, -350);
  fill(0);
  line(335, 535, 335, 525);
  line(390, 535, 390, 525);
  line(445, 535, 445, 525);
  line(500, 535, 500, 525);
  line(555, 535, 555, 525);
  strokeWeight(0);
  text('1.5', 325, 555);
  text('2.0', 380, 555);
  text('2.5', 435, 555);
  text('3.0', 490, 555);
  text('3.5', 545, 555);

  strokeWeight(3);
  fill(80, 170, 250);
  let width = 100 * (q3 - q1);
  rect(200 + q1 * 100, 500, width, -300); //x,y,w,h
  line(200 + min * 100, 200, 200 + min * 100, 500);
  line(200 + max * 100, 200, 200 + max * 100, 500);
  line(200 + median * 100, 200, 200 + median * 100, 500);
  line(200 + min * 100, 350, 200 + q1 * 100, 350);
  line(200 + q3 * 100, 350, 200 + max * 100, 350);

  strokeWeight(0);
  fill(0);
}
