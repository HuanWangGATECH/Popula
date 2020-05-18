import React, { Component } from "react";
import { format } from "d3";

export const Legend = (selection, props) => {
  const { data, legendText, shape, sizeScale } = props;

  const legend = selection
    .append("g")
    .attr("class", "legendT")
    .attr("transform", "translate(850,300)");
  legend
    .append("rect")
    .attr("rx", 10)
    .attr("opacity", 0.4)
    .attr("width", 90)
    .attr("height", 200)
    .attr("fill", "white");
  legend
    .append("text")
    .attr("transform", "translate(0,-10)")
    .text("Population");

  legend
    .append("text")
    .attr("transform", "translate(0,-10)")
    .text("Population");
  const tick = legend
    .selectAll(".legend")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "legend");

  //color
  if (shape === "rect") {
    tick
      .attr("transform", (d, i) => "translate(5," + (i * 20 + 10) + ")")
      .append("rect")
      .attr("width", 25)
      .attr("height", 10)
      .attr("fill", d => d);
  }
  if (shape === "circle") {
    tick
      .attr("transform", (d, i) => "translate(5," + (i * 40 + 20) + ")")
      .append("circle")
      .attr("r", d => format(".3s")(d))
      .attr("fill", "#00d1bf");
  }

  tick
    .append("text")
    .attr("dy", "0.32em") //这个值可以保证text在图例的正中间
    .attr("x", 30)
    .attr("y", 6)
    .text(d => format(".2s")(legendText(d)));
};
