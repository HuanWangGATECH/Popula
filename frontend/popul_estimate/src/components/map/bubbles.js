import React, { Component } from "react";
import { geoCentroid, geoAlbersUsa } from "d3";

export const Bubbles = (selection, props) => {
  const { data, colorScaleLog, colorValue } = props;
  const projection = geoAlbersUsa();
  data.forEach(d => {
    d.properties.projected = projection(geoCentroid(d)); //加了一个property,加property
    console.log(d.properties.projected);
  });
  // console.log(data);
  selection
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
      if (d.properties.projected === null) return 332;
      return d.properties.projected[0];
    })
    .attr("cy", function(d) {
      if (d.properties.projected === null) return 159;
      return d.properties.projected[1];
    })
    .attr("r", d => colorScaleLog(colorValue(d)) * 2.5)
    .style("fill", "#00d1bf");
};
