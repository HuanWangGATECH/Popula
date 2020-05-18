package edu.gatech.cse6242.team11.backend.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.gatech.cse6242.team11.backend.dao.CountyDetailDao;
import edu.gatech.cse6242.team11.backend.dao.PopulationEstimateDao;
import edu.gatech.cse6242.team11.backend.model.CountyPopulation;
import edu.gatech.cse6242.team11.backend.model.StatePopulation;
import edu.gatech.cse6242.team11.backend.repository.CountyDetail;
import edu.gatech.cse6242.team11.backend.repository.PopulationEstimate;
import edu.gatech.cse6242.team11.backend.repository.PopulationEstimateKey;
import edu.gatech.cse6242.team11.backend.utils.FipsParser;

@RestController
@RequestMapping("/population")
@CrossOrigin
public class PopulationController {

	@Autowired
	PopulationEstimateDao populationEstimateDao;
	@Autowired
	CountyDetailDao countyDetailDao;
	@Autowired
	FipsParser fipsParser;

	@GetMapping("/state/{stateId}/year/{year}")
	public StatePopulation getPopulationByStateByYear(@PathVariable int stateId, @PathVariable int year) {
		StatePopulation result = new StatePopulation();
		List<CountyDetail> countiesInState = countyDetailDao.findByState(stateId);
//		Map<Integer, List<PopulationEstimate>> recordGroupedByStateId = countiesInState.stream()
//				.flatMap(county -> populationEstimateDao.findByFips(county.getFips()).stream())
//				.filter(record -> record.getYear() == year)
//				.collect(Collectors.groupingBy(record -> fipsParser.getStateFipsFromFullFips(record.getFips())));
//		recordGroupedByStateId.forEach((stateid, record) -> System.out.println(stateid + ": " + record));
		int totalPopulation = countiesInState.stream()
				.flatMap(county -> populationEstimateDao.findByFips(county.getFips()).stream())
				.filter(record -> record.getYear() == year).map(PopulationEstimate::getPopulation)
				.reduce((a, b) -> a + b).orElse(0);

		result.setPopulation(totalPopulation);
		result.setYear(year);
		result.setStateFips(stateId);
		result.setStateName(countyDetailDao.findByState(stateId).stream().findAny().get().getStateName());
		result.setStateAbbr(countyDetailDao.findByState(stateId).stream().findAny().get().getStateAbbr());

		return result;
	}

	@GetMapping("/year/{year}/state")
	public List<StatePopulation> getAllStatePopulationByYear(@PathVariable int year) {
		List<StatePopulation> result = new ArrayList<>();
		Map<Integer, Integer> statePopulationMap = new HashMap<>();

		List<PopulationEstimate> countiesInSelectedYear = populationEstimateDao.findByYear(year);
		countiesInSelectedYear.forEach(countyPopulation -> {
			int stateFips = fipsParser.getStateFipsFromFullFips(countyPopulation.getFips());
			if (statePopulationMap.containsKey(stateFips)) {
				statePopulationMap.put(stateFips, countyPopulation.getPopulation() + statePopulationMap.get(stateFips));
			} else {
				statePopulationMap.put(stateFips, countyPopulation.getPopulation());
			}
		});
		statePopulationMap.forEach((stateFips, statePopulationNumber) -> {
			CountyDetail sampleCounty = countyDetailDao.findFirstByState(stateFips);
			StatePopulation statePopulationRecord = new StatePopulation();

			statePopulationRecord.setPopulation(statePopulationNumber);
			statePopulationRecord.setStateAbbr(sampleCounty.getStateAbbr());
			statePopulationRecord.setStateFips(stateFips);
			statePopulationRecord.setStateName(sampleCounty.getStateName());
			statePopulationRecord.setYear(year);

			result.add(statePopulationRecord);
		});
		return result;
	}

	@GetMapping("/state/{stateId}")
	public List<StatePopulation> getPopulationByStateForAllYears(@PathVariable int stateId) {
		List<StatePopulation> result = new ArrayList<>();
		List<CountyDetail> countiesInSelectedState = countyDetailDao.findByState(stateId);
		Map<Integer, Integer> yearPopulationMap = new HashMap<>();
		CountyDetail sampleCounty = countyDetailDao.findFirstByState(stateId);

		countiesInSelectedState.forEach(county -> {
			List<PopulationEstimate> countyAllYearRecord = populationEstimateDao.findByFips(county.getFips());
			countyAllYearRecord.forEach(countyRecord -> {
				if (yearPopulationMap.containsKey(countyRecord.getYear())) {
					yearPopulationMap.put(countyRecord.getYear(),
							yearPopulationMap.get(countyRecord.getYear()) + countyRecord.getPopulation());
				} else {
					yearPopulationMap.put(countyRecord.getYear(), countyRecord.getPopulation());
				}
			});
		});
		yearPopulationMap.forEach((year, population) -> {
			if (population != null) {
				StatePopulation statePopulation = new StatePopulation();

				System.out.println(year);
				System.out.println(population);
				statePopulation.setPopulation(population);
				statePopulation.setStateAbbr(sampleCounty.getStateAbbr());
				statePopulation.setStateFips(stateId);
				statePopulation.setStateName(sampleCounty.getStateName());
				statePopulation.setYear(year);

				result.add(statePopulation);

			}
		});

//		Map<Integer, List<PopulationEstimate>> recordsGroupedByYear = countiesInState.stream().flatMap((county) -> {
//			return populationEstimateDao.findByFips(county.getFips()).stream();
//		}).collect(Collectors.groupingBy(PopulationEstimate::getYear));
		return result;
	}

//	@GetMapping("/year/{year}/county")
//	public List<CountyPopulation> getAllCountyPopulationByYear(@PathVariable int year) {
//		List<CountyPopulation> result = new ArrayList<>();
//
//		List<PopulationEstimate> countyRecordInSelectedYear = populationEstimateDao.findByYear(year);
//		countyRecordInSelectedYear.forEach(record -> {
//			CountyDetail countyDetail = countyDetailDao.findById(record.getFips()).get();
//			CountyPopulation countyPopulation = new CountyPopulation();
//			countyPopulation.setCountyFips(fipsParser.getCountyFipsFromFullFips(record.getFips()));
//			countyPopulation.setCountyName(countyDetail.getCountyName());
//			countyPopulation.setFips(record.getFips());
//			countyPopulation.setPopulation(record.getPopulation());
//			countyPopulation.setStateAbbr(countyDetail.getStateAbbr());
//			countyPopulation.setStateFips(fipsParser.getStateFipsFromFullFips(record.getFips()));
//			countyPopulation.setStateName(countyDetail.getStateName());
//			countyPopulation.setYear(year);
//			result.add(countyPopulation);
//		});
//		return result;
//	}

	@GetMapping("/fips/{fips}/year/{year}")
	public CountyPopulation getPopulationByCountyByYear(@PathVariable int fips, @PathVariable int year) {
		CountyPopulation result = new CountyPopulation();

		PopulationEstimate populationEstimate = populationEstimateDao.findByFipsAndYear(fips, year);
		CountyDetail countyDetail = countyDetailDao.findById(fips).get();

		result.setCountyFips(fipsParser.getCountyFipsFromFullFips(fips));
		result.setCountyName(countyDetail.getCountyName());
		result.setFips(fips);
		result.setPopulation(populationEstimate.getPopulation());
		result.setStateAbbr(countyDetail.getStateAbbr());
		result.setStateFips(fipsParser.getStateFipsFromFullFips(fips));
		result.setStateName(countyDetail.getStateName());
		result.setYear(year);

		return result;
	}

	@GetMapping("/estimate/{fips}/{year}")
	public ResponseEntity<CountyPopulation> getPopulationEstimateByFipsByYear(@PathVariable int fips,
			@PathVariable int year) {
		CountyPopulation countyPopulation = new CountyPopulation();
		if (!countyDetailDao.findById(fips).isPresent()
				|| !populationEstimateDao.findById(new PopulationEstimateKey(fips, year)).isPresent()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		CountyDetail countyDetail = countyDetailDao.findById(fips).orElse(null);
		countyPopulation.setPopulation(
				populationEstimateDao.findById(new PopulationEstimateKey(fips, year)).get().getPopulation());
		countyPopulation.setYear(year);
		countyPopulation.setStateFips(fipsParser.getStateFipsFromFullFips(fips));
		countyPopulation.setCountyFips(fipsParser.getCountyFipsFromFullFips(fips));
		countyPopulation.setFips(fips);
		countyPopulation.setStateName(countyDetail.getStateName());
		countyPopulation.setStateAbbr(countyDetail.getStateAbbr());
		countyPopulation.setCountyName(countyDetail.getCountyName());
		return new ResponseEntity<>(countyPopulation, HttpStatus.OK);
	}

}
