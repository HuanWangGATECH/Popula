package edu.gatech.cse6242.team11.backend.model;

public class StatePopulation {

	private int population;
	private int year;
	private int stateFips;
	private String stateName;
	private String stateAbbr;

	public StatePopulation() {
		super();
		// TODO Auto-generated constructor stub
	}

	public StatePopulation(int population, int year, int stateFips, String stateName, String stateAbbr) {
		super();
		this.population = population;
		this.year = year;
		this.stateFips = stateFips;
		this.stateName = stateName;
		this.stateAbbr = stateAbbr;
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

	@Override
	public String toString() {
		return "StatePopulation [population=" + population + ", year=" + year + ", stateFips=" + stateFips
				+ ", stateName=" + stateName + ", stateAbbr=" + stateAbbr + "]";
	}

}
