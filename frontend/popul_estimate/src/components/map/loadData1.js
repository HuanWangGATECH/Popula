//import jsonData from "./us-counties.topojson";
import axios from "axios";
import { json, csv } from "d3";
import { feature, mesh } from "topojson";
import { api } from "../../config";

export const LoadData1 = year =>
  Promise.all([
    json("https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json"),
    axios.get(`${api}/${year}/pep/population?get=GEONAME,POP&for=state:*`),
    axios.get(`${api}/${year}/pep/population?get=GEONAME,POP&for=county:*`)
  ]).then(([json, popul, populCounty]) => {
    const county = feature(json, json.objects.counties).features;

    const state = feature(json, json.objects.states).features;
    const statePopulation = popul.data.reduce((accumulator, d) => {
      accumulator[d[2]] = { population: +d[1] };
      return accumulator;
    }, {});
    const countyPopulation = populCounty.data.reduce((accumulator, d) => {
      accumulator[d[2].concat(d[3])] = {
        population: +d[1],
        state: d[0].split(", ")[1]
      };
      return accumulator;
    }, {});
    //console.log(countyPopulation);
    state.forEach(d => {
      Object.assign(d.properties, statePopulation[d.id]);
    });
    county.forEach(d => {
      Object.assign(d.properties, countyPopulation[d.id]);
    });
    // console.log(state);
    const meshed = mesh(json, json.objects.states, function(a, b) {
      return a !== b;
    });
    const meshed1 = mesh(
      json,
      json.objects.counties,
      (a, b) => a !== b && ((a.id / 1000) | 0) === ((b.id / 1000) | 0)
    );
    return [state, county, meshed, meshed1];
  });
