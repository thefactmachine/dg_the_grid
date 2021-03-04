
// set the dimensions and margins of the graph
var margin = {top: 20, right: 25, bottom: 30, left: 200},
  width = 910 - margin.left - margin.right,
  height = 910 - margin.top - margin.bottom;


console.log("this is the data:");
console.log(data["data"]);

var mark_data = data;

var plot_data = data["data"]
var myGroups_x = data["group"]
var myVars_x = data["variable"]
// var myGroups_x = d3.map(data, function(d){return d.group;}).keys()
// var myVars_x = d3.map(data, function(d){return d.variable;}).keys()


// append the svg object to the body of the page
var svg_x = svg
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Build X scales and axis:
var x_x = d3.scaleBand()
  .range([ 0, width ])
  .domain(myGroups_x)
  .padding(0.05);
  
svg_x.append("g")
.style("font-size", 15)
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x_x).tickSize(0))
.select(".domain").remove()


// Build Y scales and axis:
var y_x = d3.scaleBand()
.range([ height, 0 ])
.domain(myVars_x)
.padding(0.05);
  
svg_x.append("g")
  .style("font-size", 15)
  .call(d3.axisLeft(y_x).tickSize(0))
  .select(".domain").remove()

// d3.interpolateRainbow
// d3.interpolateInferno

// Build color scale
var myColor_x = d3.scaleSequential()
  .interpolator(d3.interpolateInferno)
  .domain([1,100])

// .data(mark_data, function(d) {return d.group+':'+d.variable;})
// add the squares
svg_x.selectAll()
.data(plot_data)
.enter()
.append("rect")
  .attr("x", function(d) { return x_x(d.group) })
  .attr("y", function(d) { return y_x(d.variable) })
  .attr("rx", 4)
  .attr("ry", 4)
  .attr("width", x_x.bandwidth() )
  .attr("height", y_x.bandwidth() )
  .style("fill", function(d) { return myColor_x(d.value)} )
  .style("stroke-width", 4)
  .style("stroke", "none")
  .style("opacity", 1)
  .on("mouseover", function(d) {console.log(d.value)})

