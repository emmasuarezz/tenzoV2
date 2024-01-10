import { useState, useEffect, Dispatch, SetStateAction } from "react";

type CitiesProps = {
  country: string;
  cityError: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

function Cities({ country, cityError, setLoading }: CitiesProps) {
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    const fetchCities = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://countriesnow.space/api/v0.1/countries/cities",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              country: country,
            }),
          }
        );
        const data = await response.json();
        const citiesArray = data.data.sort();
        setCities(citiesArray);
      } catch (error) {
        setCities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [country]);

  const mapCities = (cities: string[]) => {
    if (!cities || cities.length === 0) {
      cityError(true);
      return (
        <option value="" disabled>
          Oops, sorry for that.
        </option>
      );
    }

    cityError(false);
    return cities.map((city) => (
      <option key={city} value={city}>
        {city}
      </option>
    ));
  };

  return <>{mapCities(cities)}</>;
}

export default Cities;
