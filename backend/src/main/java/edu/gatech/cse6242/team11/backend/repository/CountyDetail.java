package edu.gatech.cse6242.team11.backend.repository;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "county_detail")
public class CountyDetail {

	@Id
	@Column(name = "fips")
	private int fips;
	@Column(name = "county_name")
	private String countyName;
	@Column(name = "state_abbr")
	private String stateAbbr;
	@Column(name = "state_name")
	private String stateName;
	@Column(name = "long_name")
	private String longName;
	@Column
	private int sumlev;
	@Column
	private int region;
	@Column
	private int division;
	@Column
	private int state;
	@Column
	private int county;
	@Column(name = "crosswalk")
	private String crosswalk;
	@Column(name = "region_name")
	private String regionName;
	@Column(name = "division_name")
	private String divisionName;

	public CountyDetail() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CountyDetail(int fips, String countyName, String stateAbbr, String stateName, String longName, int sumlev,
			int region, int division, int state, int county, String crosswalk, String regionName, String divisionName) {
		super();
		this.fips = fips;
		this.countyName = countyName;
		this.stateAbbr = stateAbbr;
		this.stateName = stateName;
		this.longName = longName;
		this.sumlev = sumlev;
		this.region = region;
		this.division = division;
		this.state = state;
		this.county = county;
		this.crosswalk = crosswalk;
		this.regionName = regionName;
		this.divisionName = divisionName;
	}

	public int getFips() {
		return fips;
	}

	public void setFips(int fips) {
		this.fips = fips;
	}

	public String getCountyName() {
		return countyName;
	}

	public void setCountyName(String countyName) {
		this.countyName = countyName;
	}

	public String getStateAbbr() {
		return stateAbbr;
	}

	public void setStateAbbr(String stateAbbr) {
		this.stateAbbr = stateAbbr;
	}

	public String getStateName() {
		return stateName;
	}

	public void setStateName(String stateName) {
		this.stateName = stateName;
	}

	public String getLongName() {
		return longName;
	}

	public void setLongName(String longName) {
		this.longName = longName;
	}

	public int getSumlev() {
		return sumlev;
	}

	public void setSumlev(int sumlev) {
		this.sumlev = sumlev;
	}

	public int getRegion() {
		return region;
	}

	public void setRegion(int region) {
		this.region = region;
	}

	public int getDivision() {
		return division;
	}

	public void setDivision(int division) {
		this.division = division;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public int getCounty() {
		return county;
	}

	public void setCounty(int county) {
		this.county = county;
	}

	public String getCrosswalk() {
		return crosswalk;
	}

	public void setCrosswalk(String crosswalk) {
		this.crosswalk = crosswalk;
	}

	public String getRegionName() {
		return regionName;
	}

	public void setRegionName(String regionName) {
		this.regionName = regionName;
	}

	public String getDivisionName() {
		return divisionName;
	}

	public void setDivisionName(String divisionName) {
		this.divisionName = divisionName;
	}

	@Override
	public String toString() {
		return "CountyDetail [fips=" + fips + ", countyName=" + countyName + ", stateAbbr=" + stateAbbr + ", stateName="
				+ stateName + ", longName=" + longName + ", sumlev=" + sumlev + ", region=" + region + ", division="
				+ division + ", state=" + state + ", county=" + county + ", crosswalk=" + crosswalk + ", regionName="
				+ regionName + ", divisionName=" + divisionName + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + county;
		result = prime * result + ((countyName == null) ? 0 : countyName.hashCode());
		result = prime * result + ((crosswalk == null) ? 0 : crosswalk.hashCode());
		result = prime * result + division;
		result = prime * result + ((divisionName == null) ? 0 : divisionName.hashCode());
		result = prime * result + fips;
		result = prime * result + ((longName == null) ? 0 : longName.hashCode());
		result = prime * result + region;
		result = prime * result + ((regionName == null) ? 0 : regionName.hashCode());
		result = prime * result + state;
		result = prime * result + ((stateAbbr == null) ? 0 : stateAbbr.hashCode());
		result = prime * result + ((stateName == null) ? 0 : stateName.hashCode());
		result = prime * result + sumlev;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CountyDetail other = (CountyDetail) obj;
		if (county != other.county)
			return false;
		if (countyName == null) {
			if (other.countyName != null)
				return false;
		} else if (!countyName.equals(other.countyName))
			return false;
		if (crosswalk == null) {
			if (other.crosswalk != null)
				return false;
		} else if (!crosswalk.equals(other.crosswalk))
			return false;
		if (division != other.division)
			return false;
		if (divisionName == null) {
			if (other.divisionName != null)
				return false;
		} else if (!divisionName.equals(other.divisionName))
			return false;
		if (fips != other.fips)
			return false;
		if (longName == null) {
			if (other.longName != null)
				return false;
		} else if (!longName.equals(other.longName))
			return false;
		if (region != other.region)
			return false;
		if (regionName == null) {
			if (other.regionName != null)
				return false;
		} else if (!regionName.equals(other.regionName))
			return false;
		if (state != other.state)
			return false;
		if (stateAbbr == null) {
			if (other.stateAbbr != null)
				return false;
		} else if (!stateAbbr.equals(other.stateAbbr))
			return false;
		if (stateName == null) {
			if (other.stateName != null)
				return false;
		} else if (!stateName.equals(other.stateName))
			return false;
		if (sumlev != other.sumlev)
			return false;
		return true;
	}

}
