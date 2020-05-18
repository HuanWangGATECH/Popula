package edu.gatech.cse6242.team11.backend.model;

public class CountyPopulation {
	private int population;
	private int year;
	private int stateFips;
	private int countyFips;
	private int fips;
	private String stateName;
	private String stateAbbr;
	private String countyName;

	public CountyPopulation() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CountyPopulation(int population, int year, int stateFips, int countyFips, int fips, String stateName,
			String stateAbbr, String countyName) {
		super();
		this.population = population;
		this.year = year;
		this.stateFips = stateFips;
		this.countyFips = countyFips;
		this.fips = fips;
		this.stateName = stateName;
		this.stateAbbr = stateAbbr;
		this.countyName = countyName;
	}

	public int getPopulation() {
		return population;
	}

	public void setPopulation(int population) {
		this.population = population;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public int getStateFips() {
		return stateFips;
	}

	public void setStateFips(int stateFips) {
		this.stateFips = stateFips;
	}

	public int getCountyFips() {
		return countyFips;
	}

	public void setCountyFips(int countyFips) {
		this.countyFips = countyFips;
	}

	public int getFips() {
		return fips;
	}

	public void setFips(int fips) {
		this.fips = fips;
	}

	public String getStateName() {
		return stateName;
	}

	public void setStateName(String stateName) {
		this.stateName = stateName;
	}

	public String getStateAbbr() {
		return stateAbbr;
	}

	public void setStateAbbr(String stateAbbr) {
		this.stateAbbr = stateAbbr;
	}

	public String getCountyName() {
		return countyName;
	}

	public void setCountyName(String countyName) {
		this.countyName = countyName;
	}

	@Override
	public String toString() {
		return "CountyPopulation [population=" + population + ", year=" + year + ", stateFips=" + stateFips
				+ ", countyFips=" + countyFips + ", fips=" + fips + ", stateName=" + stateName + ", stateAbbr="
				+ stateAbbr + ", countyName=" + countyName + "]";
	}

}
