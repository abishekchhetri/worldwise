import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CityContext";

function CityList() {
  const {cities,loading} = useCities();
  if (loading) return <Spinner />;
  return cities.length < 1 ? (
    <Message message="Add your first city by adding a city on the map" />
  ) : (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
