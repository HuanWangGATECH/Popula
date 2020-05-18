package edu.gatech.cse6242.team11.backend.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.gatech.cse6242.team11.backend.repository.PopulationEstimate;
import edu.gatech.cse6242.team11.backend.repository.PopulationEstimateKey;

public interface PopulationEstimateDao extends JpaRepository<PopulationEstimate, PopulationEstimateKey> {

	List<PopulationEstimate> findByFips(int fips);

	List<PopulationEstimate> findByYear(int year);

	PopulationEstimate findByFipsAndYear(int fips, int year);

}
