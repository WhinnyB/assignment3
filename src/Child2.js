import React, {Component} from "react";
import * as d3 from "d3";

class Child2 extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    console.log(this.props.data2);
  }
  componentDidUpdate() {
    var data = this.props.data2;
    var avgTipsByDay = d3.rollup(
      data,
      v => d3.mean(v, d => d.tip), 
      d => d.day                    
    );
    var formattedData = Array.from(avgTipsByDay, ([day, avg]) => ({ day, avg }));
    var margin = { top: 30, right: 10, bottom: 30, left: 50 },
      w = 500 - margin.left - margin.right,
      h = 300 - margin.top - margin.bottom;

    var container = d3.select(".child2_svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .select(".g_2")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
      
    var x_data = formattedData.map(item => item.day);
    const x_scale = d3.scaleBand().domain(x_data).range([0, w]).padding(0.1);
    container.selectAll(".x_axis_g").data([0]).join('g').attr("class", 'x_axis_g')
    .attr("transform", `translate(0, ${h})`).call(d3.axisBottom(x_scale));
    
    var y_data = formattedData.map(item => item.avg);
    const y_scale = d3.scaleLinear().domain([0, d3.max(y_data)]).range([h, 0]);
    container.selectAll(".y_axis_g").data([0]).join('g').attr("class", 'y_axis_g')
    .attr("transform", `translate(0,0)`).call(d3.axisLeft(y_scale));

    container.selectAll(".bar")
      .data(formattedData)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d) => x_scale(d.day))
      .attr("y", (d) => y_scale(d.avg))
      .attr("width", x_scale.bandwidth())
      .attr("height", (d) => h - y_scale(d.avg))
      .style("fill", "#69b3a2");

    container.append("text")
      .attr("class", "x-axis-label")
      .attr("x", w / 2) 
      .attr("y", h + margin.bottom - 5)
      .attr("text-anchor", "middle")
      .text("DAY"); 

    container.append("text")
      .attr("class", "y-axis-label")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 15) 
      .attr("x", 0 - (h / 2)) 
      .attr("text-anchor", "middle")
      .text("Average Tip");

    container.append("text")
      .attr("class", "chart-title")
      .attr("x", w / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Average Tips by Day");
  }

  render(){
    return (
      <svg className="child2_svg">
        <g className="g_2"></g>
      </svg>
    );
  }
  
}

export default Child2;
