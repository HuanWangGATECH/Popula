export const codeToName = {
  "01": {
    abbreviation: "AL",
    name: "Alabama"
  },
  "02": {
    abbreviation: "AK",
    name: "Alaska"
  },
  "03": {
    abbreviation: "AS",
    name: "American Samoa"
  },
  "04": {
    abbreviation: "AZ",
    name: "Arizona"
  },
  "05": {
    abbreviation: "AR",
    name: "Arkansas"
  },
  "06": {
    abbreviation: "CA",
    name: "California"
  },
  "07": {
    abbreviation: "CZ",
    name: "Canal Zone"
  },
  "08": {
    abbreviation: "CO",
    name: "Colorado"
  },
  "09": {
    abbreviation: "CT",
    name: "Connecticut"
  },
  "10": {
    abbreviation: "DE",
    name: "Delaware"
  },
  "11": {
    abbreviation: "DC",
    name: "District Of Columbia"
  },
  "12": {
    abbreviation: "FL",
    name: "Florida"
  },
  "13": {
    abbreviation: "GA",
    name: "Georgia"
  },
  "14": {
    abbreviation: "GU",
    name: "Guam"
  },
  "15": {
    abbreviation: "HI",
    name: "Hawaii"
  },
  "16": {
    abbreviation: "ID",
    name: "Idaho"
  },
  "17": {
    abbreviation: "IL",
    name: "Illinois"
  },
  "18": {
    abbreviation: "IN",
    name: "Indiana"
  },
  "19": {
    abbreviation: "IA",
    name: "Iowa"
  },
  "20": {
    abbreviation: "KS",
    name: "Kansas"
  },
  "21": {
    abbreviation: "KY",
    name: "Kentucky"
  },
  "22": {
    abbreviation: "LA",
    name: "Louisiana"
  },
  "23": {
    abbreviation: "ME",
    name: "Maine"
  },
  "24": {
    abbreviation: "MD",
    name: "Maryland"
  },
  "25": {
    abbreviation: "MA",
    name: "Massachusetts"
  },
  "26": {
    abbreviation: "MI",
    name: "Michigan"
  },
  "27": {
    abbreviation: "MN",
    name: "Minnesota"
  },
  "28": {
    abbreviation: "MS",
    name: "Mississippi"
  },
  "29": {
    abbreviation: "MO",
    name: "Missouri"
  },
  "30": {
    abbreviation: "MT",
    name: "Montana"
  },
  "31": {
    abbreviation: "NE",
    name: "Nebraska"
  },
  "32": {
    abbreviation: "NV",
    name: "Nevada"
  },
  "33": {
    abbreviation: "NH",
    name: "New Hampshire"
  },
  "34": {
    abbreviation: "NJ",
    name: "New Jersey"
  },
  "35": {
    abbreviation: "NM",
    name: "New Mexico"
  },
  "36": {
    abbreviation: "NY",
    name: "New York"
  },
  "37": {
    abbreviation: "NC",
    name: "North Carolina"
  },
  "38": {
    abbreviation: "ND",
    name: "North Dakota"
  },
  "39": {
    abbreviation: "OH",
    name: "Ohio"
  },
  "40": {
    abbreviation: "OK",
    name: "Oklahoma"
  },
  "41": {
    abbreviation: "OR",
    name: "Oregon"
  },
  "42": {
    abbreviation: "PA",
    name: "Pennsylvania"
  },
  "43": {
    abbreviation: "PR",
    name: "Puerto Rico"
  },
  "44": {
    abbreviation: "RI",
    name: "Rhode Island"
  },
  "45": {
    abbreviation: "SC",
    name: "South Carolina"
  },
  "46": {
    abbreviation: "SD",
    name: "South Dakota"
  },
  "47": {
    abbreviation: "TN",
    name: "Tennessee"
  },
  "48": {
    abbreviation: "TX",
    name: "Texas"
  },
  "49": {
    abbreviation: "UT",
    name: "Utah"
  },
  "50": {
    abbreviation: "VT",
    name: "Vermont"
  },
  "51": {
    abbreviation: "VA",
    name: "Virginia"
  },
  "52": {
    abbreviation: "VI",
    name: "Virgin Islands"
  },
  "53": {
    abbreviation: "WA",
    name: "Washington"
  },
  "54": {
    abbreviation: "WV",
    name: "West Virginia"
  },
  "55": {
    abbreviation: "WI",
    name: "Wisconsin"
  },
  "56": {
    abbreviation: "WY",
    name: "Wyoming"
  }
};
export const stateToCode = {
  Alabama: "01",
  Alaska: "02",
  Arizona: "04",
  Arkansas: "05",
  California: "06",
  Colorado: "08",
  Connecticut: "09",
  Delaware: "10",
  "District of Columbia": "11",
  Florida: "12",
  Geogia: "13",
  Hawaii: "15",
  Idaho: "16",
  Illinois: "17",
  Indiana: "18",
  Iowa: "19",
  Kansas: "20",
  Kentucky: "21",
  Louisiana: "22",
  Maine: "23",
  Maryland: "24",
  Massachusetts: "25",
  Michigan: "26",
  Minnesota: "27",
  Mississippi: "28",
  Missouri: "29",
  Montana: "30",
  Nebraska: "31",
  Nevada: "32",
  "New Hampshire": "33",
  "New Jersey": "34",
  "New Mexico": "35",
  "New York": "36",
  "North Carolina": "37",
  "North Dakota": "38",
  Ohio: "39",
  Oklahoma: "40",
  Oregon: "41",
  Pennsylvania: "42",
  "Rhode Island": "44",
  "South Carolina": "45",
  "South Dakota": "46",
  Tennessee: "47",
  Texas: "48",
  Utah: "49",
  Vermont: "50",
  Virginia: "51",
  Washington: "53",
  "West Virginia": "54",
  Wisconsin: "55",
  Wyoming: "56"
};
export const convertCodeToFullName = code => {
  let name = null;
  for (let index in codeToName) {
    if (index === code) {
      name = codeToName[index].name;
    }
  }
  return name;
};

export const convertCodeToAbbr = code => {
  let abbr = null;
  for (let index in codeToName) {
    if (index === code) {
      abbr = codeToName[index].abbreviation;
    }
  }
  return abbr;
};
