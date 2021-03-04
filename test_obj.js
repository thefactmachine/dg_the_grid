// !preview r2d3 data=c(10, 30, 40, 35, 20, 10), container="div"

var barHeight = Math.ceil(height / data.length);

var bars = div
  .selectAll("rect")
  .data(data);
    
bars.enter().append("rect")
    .attr('width', function(d) { return d * width; })
    .attr('height', barHeight)
    .attr('y', function(d, i) { return i * barHeight; })
    .attr('fill', 'steelblue');


