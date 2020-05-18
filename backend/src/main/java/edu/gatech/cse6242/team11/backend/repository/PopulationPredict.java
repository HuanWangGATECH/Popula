package edu.gatech.cse6242.team11.backend.repository;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@Table(name = "population_predict")
@IdClass(PopulationEstimateKey.class)
public class PopulationPredict {

	@Id
	@Column(name = "fips")
	private int fips;
	@Id
	@Column(name = "year")
	private int year;
	@Column(name = "population")
	private int population;

	public PopulationPredict() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PopulationPredict(int fips, int year, int population) {
		super();
		this.fips = fips;
		this.year = year;
		this.population = population;
	}

	public int getFips() {
		return fips;
	}

	public void setFips(int fips) {
		this.fips = fips;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public int getPopulation() {
		return population;
	}

	public void setPopulation(int population) {
		this.population = population;
	}

	@Override
	public String toString() {
		return "PopulationPredict [fips=" + fips + ", year=" + year + ", population=" + population + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + fips;
		result = prime * result + population;
		result = prime * result + year;
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
		PopulationPredict other = (PopulationPredict) obj;
		if (fips != other.fips)
			return false;
		if (population != other.population)
			return false;
		if (year != other.year)
			return false;
		return true;
	}

}
