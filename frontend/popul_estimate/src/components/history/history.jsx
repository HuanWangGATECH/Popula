import React, { Component } from "react";
import { Select, Layout } from "antd";
import {
  retrieveStateYearlyData,
  retrieveStateDataForChosenYear,
  retrieveNationalDataForChosenYear,
  retrieveCountyDataInChosenState
} from "../../services/dataRetriever";
import {
  convertCodeToFullName,
  convertCodeToAbbr,
  stateToCode
} from "../../services/codeNameConverter";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

class History extends Component {
  constructor(props) {
    super(props);
    this.stateArray = [];
    Object.keys(stateToCode).forEach(stateName => {
      this.stateArray.push({
        stateName: stateName,
        code: stateToCode[stateName]
      });
    });
    this.state = {
      selectedYear: 2018,
      chosenState: "01",
      stateData: {},
      nationalData: [],
      countyData: [],
      yearlyDataForChosenState: []
    };
  }
  getYearlyDataForChosenState = stateID => {
    retrieveStateYearlyData(stateID).then(results => {
      let data = [];
      console.log(results);
      for (let [index, result] of results.entries()) {
        data.push({
          name: result.data[1][0],
          year: (2018 - index).toString(),
          population: result.data[1][1]
        });
      }
      data.sort((a, b) => a.year - b.year);
      this.setState({ yearlyDataForChosenState: data });
    });
  };
  getDataForChosenStateChosenYear = (state, year) => {
    retrieveStateDataForChosenYear(state, year).then(result => {
      this.setState({
        stateData: {
          id: result.data[1][2],
          population: +result.data[1][1],
          name: result.data[1][0]
        }
      });
    });
  };
  getNationalDataForChosenYear = year => {
    retrieveNationalDataForChosenYear(year).then(result => {
      let nationalData = result.data.slice(1).map(stateData => {
        return {
          population: +stateData[1],
          id: stateData[2],
          name: convertCodeToFullName(stateData[2].toString()),
          abbr: convertCodeToAbbr(stateData[2].toString())
        };
      });
      nationalData = nationalData.filter(data => data.name !== null);
      nationalData.sort((a, b) => {
        return b.population - a.population;
      });
      this.setState({ nationalData });
    });
  };
  getCountyDataInState = (state, year) => {
    retrieveCountyDataInChosenState(state, year).then(result => {
      let data = result.data.slice(1).map(countyData => {
        return {
          population: +countyData[1],
          id: countyData[3],
          name: countyData[0],
          stateID: countyData[2]
        };
      });
      data = data.filter(data => data.name !== null);
      data.sort((a, b) => {
        return b.population - a.population;
      });
      data = data.slice(0, 20);
      this.setState({ countyData: data });
    });
  };
  componentDidMount() {
    this.getCountyDataInState(this.state.chosenState, this.state.selectedYear);
    this.getYearlyDataForChosenState(this.state.chosenState);
    this.getDataForChosenStateChosenYear(
      this.state.chosenState,
      this.state.selectedYear
    );
    this.getNationalDataForChosenYear(this.state.selectedYear);
  }
  handleSelectYear = selectedYear => {
    console.log(selectedYear);
    this.setState({ selectedYear });
    this.getNationalDataForChosenYear(selectedYear);
    this.getCountyDataInState(this.state.chosenState, selectedYear);
  };
  handleSelectState = chosenState => {
    console.log(chosenState);
    this.setState({ chosenState });
    this.getYearlyDataForChosenState(chosenState);
    this.getCountyDataInState(chosenState, this.state.selectedYear);
  };
  handleBarClick = (data, index) => {
    console.log(data);
    console.log(index);
    this.setState({ chosenState: data.id });
    this.getYearlyDataForChosenState(data.id);
    this.getCountyDataInState(data.id, this.state.selectedYear);
  };
  handleLineClick = data => {
    console.log(data);
  };
  render() {
    const { Option } = Select;
    const { Header, Content, Footer, Sider } = Layout;

    return (
      <Layout>
        <Sider width={250}>
          <h4 style={{ color: "white", textAlign: "center", marginTop: 20 }}>
            Selected Year:
          </h4>
          <Select
            onChange={this.handleSelectYear}
            defaultValue={"2018"}
            style={{ display: "block", margin: "auto", width: "80%" }}
          >
            <Option value="2018">2018</Option>
            <Option value="2017">2017</Option>
            <Option value="2016">2016</Option>
            <Option value="2015">2015</Option>
          </Select>
          <h4 style={{ color: "white", textAlign: "center", marginTop: 20 }}>
            Selected State:
          </h4>
          <Select
            value={convertCodeToFullName(this.state.chosenState)}
            style={{ display: "block", margin: "auto", width: "80%" }}
            onChange={this.handleSelectState}
          >
            {this.stateArray.map(state => {
              return (
                <Option value={state.code} key={state.code}>
                  {state.stateName}
                </Option>
              );
            })}
          </Select>
        </Sider>
        <Layout>
          <Content>
            <h3 style={{ textAlign: "center", marginTop: 20 }}>
              Population of all states in the year {this.state.selectedYear}
            </h3>
            <div style={{ width: "80%", height: 400, margin: "auto" }}>
              <ResponsiveContainer>
                <BarChart
                  data={this.state.nationalData}
                  margin={{
                    top: 5,
                    right: 50,
                    left: 50,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="abbr" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="population"
                    fill="#8884d8"
                    onClick={this.handleBarClick}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* <div style={{ width: "80%", height: 400, margin: "auto" }}>
              <ResponsiveContainer>
                <LineChart
                  data={this.state.yearlyDataForChosenState}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="population" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div> */}
            <h3 style={{ textAlign: "center" }}>
              Population estimates from 2015 to 2018 for the state{" "}
              {convertCodeToFullName(this.state.chosenState)}
            </h3>
            <div style={{ width: "80%", height: 400, margin: "auto" }}>
              <ResponsiveContainer>
                <AreaChart
                  data={this.state.yearlyDataForChosenState}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis domain={["auto", "auto"]} />
                  <Tooltip />
                  <Area
                    onClick={this.handleLineClick}
                    type="monotone"
                    dataKey="population"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <h3 style={{ textAlign: "center" }}>
              Top 20 counties in {convertCodeToFullName(this.state.chosenState)}{" "}
              in the year {this.state.selectedYear}
            </h3>
            <div style={{ width: "80%", height: 1600, margin: "auto" }}>
              <ResponsiveContainer>
                <BarChart
                  data={this.state.countyData}
                  layout="vertical"
                  margin={{
                    top: 5,
                    right: 10,
                    left: 50,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="population" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default History;
