import React, { Component } from "react";
import {
  geoCentroid,
  geoAlbersUsa,
  geoPath,
  select,
  geoMercator,
  polygonContains,
  Selection
} from "d3";
import { PassThrough } from "stream";

export const DotDensity = (selection, props) => {
  const { width, height, data, pixel, colorValue } = props;
  // invisible map of polygons
  const projection = geoAlbersUsa();
  let polygon;
  console.log(data);
  data.forEach(d => {
    let polygon = d.geometry.coordinates[0][0];
    if (d.properties.name === "Alaska") {
      polygon = polygon.concat(d.geometry.coordinates[3][0]);
    }
    if (d.properties.name === "Hawaii") {
      polygon = polygon.concat(d.geometry.coordinates[4][0]);
      // polygon = polygon.concat(d.geometry.coordinates[6][0]);
    }
    polygon.forEach((item, index) => {
      return (polygon[index] = projection(item));
    });

    if (polygon[0] === null) {
      polygon = [395.37998445933624, 159];
    }
    //console.log(polygon[0]);

    let numPoints = Math.floor(d.properties.population / pixel);
    let options = {
      // DEFAULT OPTIONS:
      maxIterations: numPoints * 50,
      distance: null, // by default: MIN(width, height) / numPoints / 4,
      edgeDistance: null
    };
    options = Object.assign(
      {
        // DEFAULT OPTIONS:
        maxIterations: numPoints * 50,
        distance: null, // by default: MIN(width, height) / numPoints / 4,
        edgeDistance: options.distance
      },
      options
    );

    // calculate bounding box

    let xMin = Infinity,
      yMin = Infinity,
      xMax = -Infinity,
      yMax = -Infinity;

    polygon.forEach(p => {
      if (p[0] < xMin) xMin = p[0];
      if (p[0] > xMax) xMax = p[0];
      if (p[1] < yMin) yMin = p[1];
      if (p[1] > yMax) yMax = p[1];
    });

    let width = xMax - xMin;
    let height = yMax - yMin;

    // default options depending on bounds

    options.distance =
      options.distance || Math.min(width, height) / numPoints / 4;
    options.edgeDistance = options.edgeDistance || options.distance;

    // generate points

    let points = [];

    outer: for (let i = 0; i < options.maxIterations; i++) {
      let p = [xMin + Math.random() * width, yMin + Math.random() * height];
      if (polygonContains(polygon, p)) {
        // check distance to other points
        for (let j = 0; j < points.length; j++) {
          let dx = p[0] - points[j][0],
            dy = p[1] - points[j][1];

          if (Math.sqrt(dx * dx + dy * dy) < options.distance) continue outer;
        }
        // check distance to polygon edge
        for (let j = 0; j < polygon.length - 1; j++) {
          if (
            distPointEdge(p, polygon[j], polygon[j + 1]) < options.edgeDistance
          )
            continue outer;
        }
        points.push(p);
        if (points.length == numPoints) break;
      }
    }

    //points.complete = points.length >= numPoints;
    //console.log(points);
    var g = selection.append("g");
    g.selectAll("circle")
      .data(points)
      .enter()
      .append("circle")
      .attr("cx", d => d[0])
      .attr("cy", d => d[1])
      .attr("r", 1)
      .style("fill", "red");
  });

  function distPointEdge(p, l1, l2) {
    let A = p[0] - l1[0],
      B = p[1] - l1[1],
      C = l2[0] - l1[0],
      D = l2[1] - l1[1];

    let dot = A * C + B * D;
    let len_sq = C * C + D * D;

    // alpha is proportion of closest point on the line between l1 and l2
    let alpha = -1;
    if (len_sq != 0)
      //in case of 0 length line
      alpha = dot / len_sq;

    // points on edge closest to p
    let X, Y;

    if (alpha < 0) {
      X = l1[0];
      Y = l1[1];
    } else if (alpha > 1) {
      X = l2[0];
      Y = l2[1];
    } else {
      X = l1[0] + alpha * C;
      Y = l1[1] + alpha * D;
    }

    let dx = p[0] - X;
    let dy = p[1] - Y;

    return Math.sqrt(dx * dx + dy * dy);
  }
};
