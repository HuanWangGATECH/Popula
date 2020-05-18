package edu.gatech.cse6242.team11.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.gatech.cse6242.team11.backend.dao.CountyDetailDao;
import edu.gatech.cse6242.team11.backend.repository.CountyDetail;

@RestController
@RequestMapping("/county")
@CrossOrigin
public class CountyDetailController {

	@Autowired
	private CountyDetailDao countyDetailDao;

	@GetMapping("/{countyFips}")
	public CountyDetail getCountyDetailByFips(@PathVariable int countyFips) {

		if (countyDetailDao.findById(countyFips).isPresent()) {
			return countyDetailDao.findById(countyFips).get();
		}
		return null;
	}

}
