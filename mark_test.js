
// set the dimensions and margins of the graph

var square_dimensions = 1060;
var margin_top_bottom = 300;

// from 260 to 170
var margin = {top: 0, right: 0, 
  bottom: margin_top_bottom, left: margin_top_bottom},
  width = square_dimensions - margin.left - margin.right,
  height = square_dimensions - margin.top - margin.bottom;

// ====================================================================
// globals
var flt_padding = 0.06;
var str_label_color = "grey";
var int_rounding_factor = 0.1;
var int_font_size = 10;
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

var int_size = d3.set(lbl_to_x).size();
var flt_cell_size_x = width / int_size;
var flt_cell_size_y = height / int_size;

// ====================================================================
// Build X scales and axis:
// padding is a proportion of total width
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
  .attr("dx", "-10px")
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
// width = 700  / number elements. 
  var x_add = 2 * flt_cell_size_x;
  var x_subtract = 12 * flt_cell_size_x;

  var y_add = 2 * flt_cell_size_y;
  var y_subtract = 7 * flt_cell_size_y;

  var x_fin = x_raw > 370 ? x_raw - x_subtract: x_raw + x_add;
  var y_fin = y_raw > 350 ? y_raw - y_subtract: y_raw + y_add;

  sub_graph_container.attr("transform", "translate(" + x_fin  + "," + y_fin + ")");
}    


function fn_y_tick_update(str_y_val) {
  y_axis_group.selectAll('.tick').each(function(d, i) {
    if(d == str_y_val) {
    d3.select(this).selectAll('text')
      .style("fill", "red")
      .style("font-size", int_font_size + 3);

    }
    else {
      d3.select(this).selectAll('text')
        .style("fill", "grey")
        .style("font-size", int_font_size );
    }
 })
}


function fn_x_tick_update(str_x_val) {
  x_axis_group.selectAll('.tick').each(function(d, i) {
    if(d == str_x_val) {
    d3.select(this).selectAll('text')
      .style("fill", "red")
      .style("font-size", int_font_size + 3);

    }
    else {
      d3.select(this).selectAll('text')
      .style("fill", "grey")
      .style("font-size", int_font_size);
    }
 })
}


console.log("x bandwidth " + x_to.bandwidth())
console.log("Y bandwidth " + y_from.bandwidth())

var flt_range_min = x_to.bandwidth() * 0.1;
var fn_size_sqrt = d3.scaleSqrt()
.domain([d_min, d_max])
.range([flt_range_min, x_to.bandwidth()]);


function fn_recalc_pos(flt_actual_size, flt_max_size, flt_start_pos) {
  return(flt_start_pos + (flt_max_size - flt_actual_size) / 2);
}


// can set .style("stroke", "none")
group_container.append("g")
.attr("id", "graph_detail_container")
.selectAll()
.data(plot_data)
.enter()
.append("rect")
  // if the shape is scaled to match area with value then centreing within cell becomes tricky.
  .attr("x", function(d) { return fn_recalc_pos(fn_size_sqrt(d.value),x_to.bandwidth(), x_to(d.to))})
  .attr("y", function(d) { return fn_recalc_pos(fn_size_sqrt(d.value),y_from.bandwidth(), y_from(d.from))})
  .attr("rx", int_rounding_factor)
  .attr("ry", int_rounding_factor)
  .attr("width", function(d) { return(fn_size_sqrt(d.value))})
  .attr("height", function(d) { return(fn_size_sqrt(d.value))})
 
  // .attr("width", x_to.bandwidth())
 // .attr("height", y_from.bandwidth() )
  .style("fill", function(d) { return d_color(d.value)} )
  .style("stroke-width", 0.5)
  .style("stroke", "none")
  .style("opacity", 1)
  .on("mouseover", function(d) { 
    var str_message = "To: " + x_to(d.to) + "  From:   " +  y_from(d.from) + "  val: " + d.value + " bandwidth " + x_to.bandwidth();
    console.log(fn_size_sqrt(d.value));
    var str_q =  "To: " + d.to + "  From:   " + d.from;
    fn_y_tick_update(d.from);
    fn_x_tick_update(d.to);
    
    fn_sub_chart_pos(x_to(d.to),  y_from(d.from));
    // sub_graph_container.attr("transform", "translate(" + x_to(d.to)  + "," + y_from(d.from) + ")");
  //  console.log(d3.set(lbl_to_x).size());
   // console.log(str_message);

  
  // console.log(str_q);
  });
  
// =======================================================================





var sub_graph_container = group_container.append("g")
  .attr("id", "sub_graph_container")


  sub_graph_container.append("rect")
		.attr("width", 11 * flt_cell_size_x)
		.attr("height", 7 * flt_cell_size_y)
		.attr("x", 0) 
		.attr("y", 0)
		.attr("style", "fill:rgb(255,255,255)")
		.attr("stroke", "none")
		.attr("opacity", ".95");
		
		
		
		
  
