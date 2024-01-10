import { useState, useEffect } from "react";

type Country = string;

const mapCountries = (array: any) => {
  const mappedArray = array.map((country) => country.name.common);
  const sortedArray = mappedArray.sort();
  return sortedArray;
};

function CountrySelect() {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name")
      .then((response) => response.json())
      .then((data) => setCountries(mapCountries(data)));
  }, []);

  return (
    <>
      {countries.map((country) => (
        <option key={country} value={country}>
          {country}
        </option>
      ))}
    </>
  );
}

export default CountrySelect;
