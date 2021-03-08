
// set the dimensions and margins of the graph

// from 260 to 170
var margin = {top: 0, right: 0, bottom: 260, left: 210},
  width = 910 - margin.left - margin.right,
  height = 910 - margin.top - margin.bottom;

// ====================================================================
// globals
var flt_padding = 0.1;
var str_label_color = "grey";
var int_rounding_factor = 1;
var int_font_size = 8;
// ====================================================================

// We get an svg object as part of the R2D3 workflow
var group_container = svg
  .attr("id", "svg_container")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("id", "group_container")
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
  
var x_axis_group = group_container.append("g")
  .attr("id", "x_tick_container")
  .attr("transform", "translate(0," + height + ")")
  .style("font-size", int_font_size);

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
  
var y_axis_group = group_container.append("g")
  .style("font-size", int_font_size)
  .attr("id", "y_tick_container")

var y_axis_tick_group = y_axis_group.call(d3.axisLeft(y_from).tickSize(0))

y_axis_tick_group.selectAll("text")
  .attr("dx", "-1em")
  // centre text horizontally
  .attr("dy", ".2em")
  .style("fill", str_label_color)
  // right justified
  .style("text-anchor", "end")


// remove line
y_axis_tick_group.select(".domain").remove()

// ====================================================================
// ====================================================================

// Build color scale
var myColor_x = d3.scaleSequential()
  .interpolator(d3.interpolateInferno)
  .domain([1,100])

// ====================================================================


var d_min = d3.min(plot_data, function(d){return +d["value"];});
var d_max = d3.max(plot_data, function(d){return +d["value"];});


var d_color = d3.scaleLinear()
    .domain([d_min, d_max])
    .range(["#A6FDFF", "#00007F"]);


function fn_sub_chart_pos(x_raw, y_raw) {
    var x_fin = x_raw > 370 ? x_raw - 280: x_raw;
    var y_fin = y_raw > 350 ? y_raw - 180: y_raw;
   sub_graph_container.attr("transform", "translate(" + x_fin  + "," + y_fin + ")");
}    

  
 
// can set .style("stroke", "none")
group_container.append("g")
.attr("id", "graph_detail_container")
.selectAll()
.data(plot_data)
.enter()
.append("rect")
  .attr("x", function(d) { return x_to(d.to) })
  .attr("y", function(d) { return y_from(d.from) })
  .attr("rx", int_rounding_factor)
  .attr("ry", int_rounding_factor)
  .attr("width", x_to.bandwidth() )
  .attr("height", y_from.bandwidth() )
  .style("fill", function(d) { return d_color(d.value)} )
  .style("stroke-width", 0.5)
  .style("stroke", "none")
  .style("opacity", 1)
  .on("mouseover", function(d) { 
    var str_message = "To: " + x_to(d.to) + "  From:   " +  y_from(d.from) + "  val: " + d.value;
    fn_sub_chart_pos(x_to(d.to),  y_from(d.from));
    // sub_graph_container.attr("transform", "translate(" + x_to(d.to)  + "," + y_from(d.from) + ")");
    console.log(str_message);
  });
  
// =======================================================================





var sub_graph_container = group_container.append("g")
  .attr("id", "sub_graph_container")

sub_graph_container.append("rect")
		.attr("width", 250)
		.attr("height", 150)
		.attr("x", 0)
		.attr("y", 0)
		.attr("style", "fill:rgb(255,0,0)")
		.attr("stroke", "grey")
		.attr("opacity", "0.5");
		
		
		
		
  
