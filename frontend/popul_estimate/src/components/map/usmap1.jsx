import React, { Component } from "react";
import {
  select,
  geoPath,
  schemeYlOrRd,
  scaleSqrt,
  extent,
  scaleLog,
  zoom,
  format,
  event,
  scaleQuantize,
  geoAlbersUsa
} from "d3";
import d3Tip from "d3-tip";
import "./usmap1.css";
import { LoadData1 } from "./loadData1";

import { Bubbles } from "./bubbles";
import { Legend } from "./legend";
import { DotDensity } from "./dotDensity";
class US1 extends Component {
  componentDidMount() {
    this.usMap();
  }

  usMap() {
    let display = "State";
    let year = 2015;
    let visualization = "Shaded Area";
    const onOptionClicked = category => {
      display = category;
    };
    const onYearClicked = category => {
      year = category;
    };
    const onVisualClicked = category => {
      visualization = category;
    };
    const selectDisplay = select(this.refs.display).on("change", () => {
      //console.log(this.value);
      onOptionClicked(event.target.value);
      select(".center-container").remove();
      if (display === "County") {
        console.log(display);
        visualization = "Shaded Area";
        selectVisual.select(".Shaded").property("selected", true);
      }
      this.map([display, year, visualization]);
    });
    const selectYear = select(this.refs.year).on("change", () => {
      //console.log(this.value);
      onYearClicked(event.target.value);
      select(".center-container").remove();
      this.map([display, year, visualization]);
    });
    const selectVisual = select(this.refs.visualType).on("change", () => {
      //console.log(this.value);
      onVisualClicked(event.target.value);
      select(".center-container").remove();
      this.map([display, year, visualization]);
      console.log(visualization);
    });
    this.map([display, year, visualization]);
    const option = selectDisplay
      .selectAll(".displayOption")
      .data(["County", "State"]);
    option
      .enter()
      .append("option")
      .attr("class", "displayOption")
      .attr("value", d => d)
      .property("selected", d => d === display)
      .text(d => d);
    const optionYear = selectYear.selectAll(".yearOption").data([2015, 2016]);
    optionYear
      .enter()
      .append("option")
      .attr("class", "yearOption")
      .attr("value", d => d)
      .property("selected", d => d === year)
      .text(d => d);
    const optionVisual = selectVisual
      .selectAll(".visualOption")
      .data(["Shaded Area", "Bubbles", "Dot Density"]);

    optionVisual
      .enter()
      .append("option")
      .attr("class", d => d.split(" ")[0])
      .attr("value", d => d)
      .property("selected", d => d === visualization)
      .text(d => d);
  }
  map([display, year, visualType]) {
    const canvasWidth = 960;
    const ratio = 0.6;
    var margin = {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10
    };
    var canvasHeight = canvasWidth * ratio;
    //  console.log(this.refs.usmap1);
    const colorValue = d => d.properties.population;
    const svg = select(this.refs.mapdiv)
      .append("svg")
      .attr("class", "center-container")
      .attr("width", canvasWidth)
      .attr("height", canvasHeight)
      .attr("transform", "translate(150,40)");
    const zoomState = (d, node) => {
      //参数中的node是当前选定区域，下面的node()是指background区
      if (select(".background").node() === node) return reset();
      if (active.node() === node) return reset();
      active.classed("active", false);
      active = select(node).classed("active", true);
      var bounds = path.bounds(d),
        dx = bounds[1][0] - bounds[0][0],
        dy = bounds[1][1] - bounds[0][1],
        x = (bounds[0][0] + bounds[1][0]) / 2,
        y = (bounds[0][1] + bounds[1][1]) / 2,
        scale = 0.9 / Math.max(dx / canvasWidth, dy / canvasHeight),
        translate = [canvasWidth / 2 - scale * x, canvasHeight / 2 - scale * y];
      g.transition()
        .duration(750)
        .style("stroke-width", 1.5 / scale + "px")
        .attr("transform", "translate(" + translate + ")scale(" + scale + ")");
      if (visualType === "Bubbles")
        select(".legendT").attr("style", "visibility: hidden");
    };

    const reset = () => {
      active.classed("active", false);
      active = select(null);

      g.transition()
        .delay(100)
        .duration(750)
        .style("stroke-width", "1.5px")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      if (visualType === "Bubbles")
        select(".legendT").attr("style", "visibility: visible");
    };

    svg
      .append("rect")
      .attr("class", "background center-container")
      .attr("height", canvasHeight + 10)
      .attr("width", canvasWidth + 10)
      .on("click", zoomState);
    let dataCounty, dataState, meshed, meshed1;

    LoadData1(year).then(mapData => {
      dataCounty = mapData[1];
      dataState = mapData[0];
      meshed = mapData[2];
      meshed1 = mapData[3];
      drawMap();
    });
    let zoomMethod;
    const tip = d3Tip()
      .attr("class", "tip")
      .html(d => {
        return (
          "<span'>State: " +
          d.properties.name +
          "<br>Population: " +
          format(",")(d.properties.population) +
          "<br><i>" +
          zoomMethod +
          " to zoom in/out</i>" +
          "</span>"
        );
      });
    const tipCounty = d3Tip()
      .attr("class", "tip")
      .html(d => {
        return (
          "<span'>County: " +
          d.properties.name +
          "<br>State: " +
          d.properties.state +
          "<br>Population: " +
          format(",")(d.properties.population) +
          "<br><i>scroll to zoom in/out</i>" +
          "</span>"
        );
      });
    var active = select(null);
    const g = svg.append("g").attr("transform", "translate(0,0)");
    const path = geoPath().projection(geoAlbersUsa());
    const drawMap = () => {
      const colorScaleLog = scaleLog()
        .clamp(true)
        .domain(extent(dataState, colorValue))
        .range([0, 8]);
      const colorScaleLog1 = scaleLog()
        .clamp(true)
        .domain(extent(dataCounty, colorValue))
        .range([0, 8]);
      const colorScale = scaleQuantize()
        .domain(colorScaleLog.range()) //排序
        .range(schemeYlOrRd[9]);

      const sizeScale = scaleSqrt()
        .domain(colorScaleLog.range())
        .range([0, 18]);

      const colorScale1 = scaleQuantize()
        .domain(colorScaleLog1.range()) //排序
        .range(schemeYlOrRd[9]);
      const counties = g.append("g").attr("id", "counties");
      zoomMethod = "scroll";

      counties.call(tipCounty);
      const county = counties
        .selectAll("path")
        .data(dataCounty)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", d => colorScale1(colorScaleLog1(colorValue(d))))
        .attr("class", "county_boundary")
        .on("mouseover", tipCounty.show) //鼠标悬停
        .on("mouseout", tipCounty.hide)
        .on("click", reset);

      let legendData = colorScale.range();
      let legendText = d => colorScaleLog.invert(colorScale.invertExtent(d)[0]);
      if (display === "County") {
        select(this.refs.visualType)
          .selectAll(".Bubbles,.Dot")
          .attr("disabled", true);
        g.call(
          zoom().on("zoom", () => {
            g.attr("transform", event.transform);
          })
        );

        counties
          .append("path")
          .datum(meshed1)
          .attr("id", "county-borders")
          .attr("d", path);
        //zoom out county
        county.attr("class", function(d, i) {
          return "county" + i;
        });
        legendData = colorScale1.range();
        legendText = d => colorScaleLog1.invert(colorScale1.invertExtent(d)[0]);
      } else {
        select(this.refs.visualType)
          .selectAll(".Bubbles,.Dot")
          .attr("disabled", null);
        //display state map
        const states = g.append("g").attr("id", "states");

        const statePath = states
          .selectAll("path")
          .data(dataState)
          .enter()
          .append("path")
          .attr("d", path)
          .attr("class", function(d, i) {
            return "state" + i;
          });

        if (visualType === "Bubbles") {
          g.call(Bubbles, {
            data: dataState,
            colorScaleLog,
            colorValue
          });
          zoomMethod = "click";
          states.call(tip);
          states.selectAll("path").on("click", function(d, i) {
            zoomState(d, select(".state" + i).node());
          });
        }
        if (visualType === "Dot Density") {
          g.call(DotDensity, {
            width: canvasWidth,
            height: canvasHeight,
            data: dataState,
            pixel: 100000
          });
          zoomMethod = "scroll";
          states.call(tip);
          g.call(
            zoom().on("zoom", () => {
              g.attr("transform", event.transform);
            })
          );
        }
        if (visualType === "Shaded Area") {
          states
            .selectAll("path")
            .attr("fill", d => colorScale(colorScaleLog(colorValue(d))));
          zoomMethod = "click";
          states.call(tip);
          states.selectAll("path").on("click", function(d, i) {
            zoomState(d, select(".state" + i).node());
          });
        }
        states
          .selectAll("path")
          .on("mouseover", tip.show) //鼠标悬停
          .on("mouseout", tip.hide);
      }
      //state boders
      g.append("path")
        .datum(meshed)
        .attr("id", "state-borders")
        .attr("d", path);

      //legend for diffrent visualization
      if (visualType === "Shaded Area") {
        svg.call(Legend, {
          data: legendData,
          legendText,
          shape: "rect"
        });
      }

      if (visualType === "Bubbles") {
        svg.call(Legend, {
          data: [1, 4, 8, 12, 16, 20].reverse(),
          legendText: d => colorScaleLog.invert(d / 2.5),
          shape: "circle",
          sizeScale
        });
      }
      if (visualType === "Dot Density") {
        const legend = svg
          .append("g")
          .attr("class", "legendT")
          .attr("transform", "translate(730,350)");
        legend
          .append("text")
          .attr("transform", "translate(30,-10)")
          .text("Population: ");
        legend
          .append("text")
          .attr("dy", "0.32em") //这个值可以保证text在图例的正中间
          .attr("x", 30)
          .attr("y", 6)
          .text("1 pixel= 100 000");
      }
    };
  }

  render() {
    return (
      <div ref="mapdiv">
        <div align="center">
          <b>Year: </b>{" "}
          <select
            ref="year"
            className="btn btn-secondary dropdown-toggle"
          ></select>
          <b>&nbsp; &nbsp;Geography Level: </b>{" "}
          <select
            ref="display"
            className="btn btn-secondary dropdown-toggle"
          ></select>
          <b>&nbsp; &nbsp;Visualization Type: </b>{" "}
          <select
            ref="visualType"
            className="btn btn-secondary dropdown-toggle"
          ></select>
        </div>
      </div>
    );
  }
}
export default US1;
