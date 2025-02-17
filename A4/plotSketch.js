const containerWidth = 800;
const containerHeight = 700;
const margins = {
  top: 50,
  right: 40,
  bottom: 80,
  left: 100,
};
const width = containerWidth - margins.left - margins.right;
const height =
  containerHeight - margins.top - margins.bottom;

const svg = d3
  .select('#chart-container')
  .append('svg')
  .attr('width', containerWidth)
  .attr('height', containerHeight)
  .append('g')
  .attr(
    'transform',
    `translate(${margins.left},${margins.top})`,
  );

function draw() {
  d3.csv('ecuadorRainfall.csv').then(function (data) {
    // Convert string values to numbers
    data.forEach(function (d) {
      d.total_precipitation = +d.total_precipitation;
    });

    // scale for x axis
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.Year))
      .range([0, width]);
    //.padding(0.1);

    // scale for y axis
    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, (d) => d.total_precipitation),
      ])
      .nice()
      .range([height, 0]);

    // adding x axis
    svg
      .append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // adding y axis
    svg
      .append('g')
      .attr('class', 'axis axis-y')
      .call(d3.axisLeft(y).ticks(5));

    // adding title and axis labels
    svg
      .append('text')
      .attr('class', 'title')
      .attr('x', width / 2)
      .attr('y', -20)
      .attr('text-anchor', 'middle')
      .text('Rainfall in Ecuador between 1940 & 1950');

    svg
      .append('text')
      .attr('class', 'axes')
      .attr('x', width / 2)
      .attr('y', 620)
      .attr('text-anchor', 'middle')
      .text('Year');

    svg
      .append('text')
      .attr('class', 'axes')
      .attr('x', height / -2)
      .attr('y', -70)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Total Percipitation (mm)');

    // adding points
    svg
      .selectAll('.point')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'point')
      .attr('cx', (d) => x(d.Year) + 30) // needed to shift the x since the coord is the center not the corner
      .attr('r', 10)
      .attr('cy', (d) => y(d.total_precipitation));
  });
}
