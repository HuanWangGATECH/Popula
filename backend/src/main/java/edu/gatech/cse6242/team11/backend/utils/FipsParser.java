package edu.gatech.cse6242.team11.backend.utils;

import org.springframework.stereotype.Service;

@Service
public class FipsParser {

	public int getStateFipsFromFullFips(int fullFips) {

		String fipsString = String.valueOf(fullFips);
		String resultString = null;
		if (fipsString.length() == 4) {
			resultString = fipsString.substring(0, 1);
		}
		if (fipsString.length() == 5) {
			resultString = fipsString.substring(0, 2);
		}
		return Integer.parseInt(resultString);
	}

	public int getCountyFipsFromFullFips(int fullFips) {

		String fipsString = String.valueOf(fullFips);
		String resultString = null;
		if (fipsString.length() == 4) {
			resultString = fipsString.substring(1);
		}
		if (fipsString.length() == 5) {
			resultString = fipsString.substring(2);
		}
		return Integer.parseInt(resultString);
	}

}
