package edu.gatech.cse6242.team11.backend.repository;

import java.io.Serializable;

public class PopulationEstimateKey implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3675774063173878380L;
	private int fips;
	private int year;

	public PopulationEstimateKey() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PopulationEstimateKey(int fips, int year) {
		super();
		this.fips = fips;
		this.year = year;
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

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public String toString() {
		return "PopulationEstimateKey [fips=" + fips + ", year=" + year + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + fips;
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
		PopulationEstimateKey other = (PopulationEstimateKey) obj;
		if (fips != other.fips)
			return false;
		if (year != other.year)
			return false;
		return true;
	}

}
