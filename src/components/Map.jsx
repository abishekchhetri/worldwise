import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CityContext";
import useGeoLocation from "../../hooks/useGeoLocation";
import Button from "./Button";
// the main learning here is dom synchronization with the state and the url itself
function Map() {
  const { isLoading, position, error, getPosition } = useGeoLocation();
  const [mapLocation, setMapLocation] = useState([40, 0]);
  const [location, setLocation] = useSearchParams();
  const lat = +location.get("lat");
  const lng = +location.get("lng");
  const { cities } = useCities();

  // checking for git going on
  //synchronizing change in url with lat and lng to the map state, example if url changes with lat and lng we synchronize it with the overall map component
  useEffect(() => {
    if (lat !== 0 && lng !== 0) setMapLocation([lat, lng]);
  }, [lat, lng]);

  // synchronizing the change in position with the setMapLocation
  useEffect(() => {
    if (position.lat && position.lng)
      setMapLocation([+position.lat, +position.lng]);
  }, [position.lat, position.lng]);

  return (
    <>
      <MapContainer
        center={mapLocation}
        className={styles.mapContainer}
        zoom={15}
        scrollWheelZoom={true}
      >
        <TileLayer
          className={styles.map}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>{city.emoji + " " + city.country}</Popup>
          </Marker>
        ))}

        <ChangeCenter coordinate={mapLocation} />
        <ClickMap />
      </MapContainer>
      <Button type="position" onClick={getPosition}>
        {!isLoading ? "USE YOUR LOCATION" : "LOADING....."}
      </Button>
    </>
  );
}

function ChangeCenter({ coordinate }) {
  const map = useMap(coordinate);
  map.setView(coordinate);
  return null;
}

function ClickMap() {
  const navigate = useNavigate();
  const map = useMapEvents({
    click(e) {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });

  return null;
}

export default Map;
