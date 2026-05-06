import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CityContext";

function CityList() {
  const {cities,loading} = useCities();
  if (loading) return <Spinner />;
  const countries = cities.reduce(
    (acc, val) =>
      !acc.find((a) => a.country === val.country)
        ? [...acc, { country: val.country, emoji: val.emoji }]
        : [...acc],
    [],
  );
  
  return cities.length < 1 ? (
    <Message message="Add your first city by adding a city on the map" />
  ) : (
    <ul className={styles.countryList}>
      {countries.map((country,idx) => (
        <CountryItem country={country} key={idx} />
      ))}
    </ul>
  );
}

export default CityList;
