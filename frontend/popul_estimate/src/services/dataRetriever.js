import { apiKey } from "../config";
import axios from "axios";
export const retrieveStateYearlyData = state => {
  let data = [];

  return Promise.all([
    axios.get(`http://api.census.gov/data/2018/pep/population`, {
      params: {
        get: "GEONAME,POP",
        for: `STATE:${state}`,
        key: "fb3e4eccc228adcc590148e636e35cd616ec2eb5"
      }
    }),
    axios.get(`http://api.census.gov/data/2017/pep/population`, {
      params: {
        get: "GEONAME,POP",
        for: `STATE:${state}`,
        key: "fb3e4eccc228adcc590148e636e35cd616ec2eb5"
      }
    }),
    axios.get(`http://api.census.gov/data/2016/pep/population`, {
      params: {
        get: "GEONAME,POP",
        for: `STATE:${state}`,
        key: "fb3e4eccc228adcc590148e636e35cd616ec2eb5"
      }
    }),
    axios.get(`http://api.census.gov/data/2015/pep/population`, {
      params: {
        get: "GEONAME,POP",
        for: `STATE:${state}`,
        key: "fb3e4eccc228adcc590148e636e35cd616ec2eb5"
      }
    })
  ]);
};
export const retrieveStateDataForChosenYear = (state, year) => {
  return axios.get(`https://api.census.gov/data/${year}/pep/population`, {
    params: {
      get: "GEONAME,POP",
      for: `STATE:${state}`,
      key: "fb3e4eccc228adcc590148e636e35cd616ec2eb5"
    }
  });
};
export const retrieveNationalDataForChosenYear = year => {
  return axios.get(`https://api.census.gov/data/${year}/pep/population`, {
    params: {
      get: "GEONAME,POP",
      for: `STATE:*`,
      key: "fb3e4eccc228adcc590148e636e35cd616ec2eb5"
    }
  });
};
export const retrieveCountyDataInChosenState = (state, year) => {
  return axios.get(`https://api.census.gov/data/${year}/pep/population`, {
    params: {
      get: "GEONAME,POP",
      for: `COUNTY:*`,
      key: "fb3e4eccc228adcc590148e636e35cd616ec2eb5",
      in: `STATE:${state}`
    }
  });
};
