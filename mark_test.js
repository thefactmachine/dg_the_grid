
// set the dimensions and margins of the graph
var margin = {top: 0, right: 0, bottom: 260, left: 260},
  width = 910 - margin.left - margin.right,
  height = 910 - margin.top - margin.bottom;

// ====================================================================
// globals
var flt_padding = 0.01;
var str_label_color = "grey";


// ====================================================================

// append the svg object to the body of the page
var svg_x = svg
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// ====================================================================

// get the data
var plot_data = data["data"]
var lbl_to_x = data["lbl_to_x"]
var lbl_from_y = data["lbl_from_y"]

// ====================================================================
// Build X scales and axis:
var x_to = d3.scaleBand()
  .range([ 0, width ])
  .domain(lbl_to_x)
  .padding(flt_padding);
  
var x_axis_group = svg_x.append("g")
  .attr("transform", "translate(0," + height + ")")

var x_axis_tick_group = x_axis_group.call(d3.axisBottom(x_to).tickSize(0));

// add labels
x_axis_tick_group.selectAll("text")
  .attr("transform", "rotate(-90)")
  // add space between x axis and end of text
  .attr("dx", "-1em")
  // centre text horizontally
  .attr("dy", "0em")
  .style("fill", str_label_color)
  .style("text-anchor", "end")
  
// remove line
x_axis_tick_group.select(".domain").remove()

// ====================================================================
// Build Y scales and axis:
var y_from = d3.scaleBand()
.range([ height, 0 ])
.domain(lbl_from_y)
.padding(flt_padding);
  
var y_axis_group = svg_x.append("g")

var y_axis_tick_group = y_axis_group.call(d3.axisLeft(y_from).tickSize(0))

y_axis_tick_group.selectAll("text")
  // add space between x axis and end of text
//  .attr("dx", "-1em")
  // centre text horizontally
//  .attr("dy", "0em")
  .style("fill", str_label_color)
//  .style("text-anchor", "end")

// remove line
y_axis_tick_group.select(".domain").remove()

// ====================================================================
// ====================================================================

// Build color scale
var myColor_x = d3.scaleSequential()
  .interpolator(d3.interpolateInferno)
  .domain([1,100])

// ====================================================================
// can set .style("stroke", "none")
svg_x.selectAll()
.data(plot_data)
.enter()
.append("rect")
  .attr("x", function(d) { return x_to(d.to) })
  .attr("y", function(d) { return y_from(d.from) })
  .attr("rx", 4)
  .attr("ry", 4)
  .attr("width", x_to.bandwidth() )
  .attr("height", y_from.bandwidth() )
  .style("fill", function(d) { return myColor_x(d.value)} )
  .style("stroke-width", 2)
  .style("stroke", "white")
  .style("opacity", 1)
  .on("mouseover", function(d) {console.log(d.value)})
