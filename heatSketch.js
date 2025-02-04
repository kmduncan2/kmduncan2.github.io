// let rain_gist =
//   'https://gist.githubusercontent.com/kmduncan2/f83d05fce22dd39d477fbc5e997d8994/raw/151298f0472af7d2064e67cf1e48f9046c4232eb/cities_rainfall.csv';

let table;

function preload() {
  table = loadTable('multiple_cities_rainfall.csv', 'csv', 'header');
}

function setup() {
  createCanvas(800, 800);

  print(table.getColumn('total_precipitation'));
}

function draw() {
  background(255);

  var rain = table.getColumn('total_precipitation');
  var year = table.getColumn('Year');
  var country = table.getColumn('Entity');

  strokeWeight(0);

  var count = 40;
  var check = country[0];
  text('Country', 30, 185);
  text('Country', 30, 185);
  text(check, 30, 185 + count);
  text('Year', 355, 160);

  //loop through all the data to plot it
  for (var i = 0; i < rain.length; i++) {
    if (country[i] != check) {
      //adds the countries to the y-axis
      check = country[i];
      count += 40;
      fill('black');
      text(check, 30, 185 + count);
    }

    if (count == 40) {
      // adds the years to the x-axis
      fill('black');
      text(year[i], 155 + 40 * i, 185);
    }

    //decides the color of the square depending on the amount of rain
    if (rain[i] < 861) {
      fill(201, 255, 229);
    } else if (rain[i] < 1542) {
      fill(153, 230, 179);
    } else if (rain[i] < 2223) {
      fill(68, 215, 168);
    } else if (rain[i] < 2904) {
      fill(48, 186, 143);
    } else if (rain[i] < 3585) {
      fill(0, 117, 94);
    } else {
      fill(0, 66, 66);
    }

    //plots each square
    rect(
      150 + 40 * (parseInt(year[i]) - 1995),
      160 + count,
      40,
      40,
    );

    fill(0, 0, 0);
  }

  //creating the legend
  fill(201, 255, 229);
  rect(620, 120, 20, 20);
  fill(153, 230, 179);
  rect(640, 120, 20, 20);
  fill(68, 215, 168);
  rect(660, 120, 20, 20);
  fill(48, 186, 143);
  rect(680, 120, 20, 20);
  fill(0, 117, 94);
  rect(700, 120, 20, 20);
  fill(0, 66, 66);
  rect(720, 120, 20, 20);

  fill('black');
  text('180', 620, 155);
  text('4267', 715, 155);
  text('Total Pericpitation (mm)', 620, 115);

  //title
  textSize(15);
  text(
    'Total Precipitation in Ecuador between 1995 & 2005',
    205,
    100,
  );
  textSize(12);
}
