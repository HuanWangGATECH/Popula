package edu.gatech.cse6242.team11.backend.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.gatech.cse6242.team11.backend.repository.CountyDetail;

public interface CountyDetailDao extends JpaRepository<CountyDetail, Integer> {

	List<CountyDetail> findByState(int stateFips);

	CountyDetail findFirstByState(int stateFips);
}
