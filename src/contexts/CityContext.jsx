import { createContext, useContext, useEffect, useState } from "react";

const cityContext = createContext();
export function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState({});
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetch("http://localhost:9000/cities");
        const cities = await data.json();
        setCities(cities);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function loadCity(id) {
    try {
      setLoading(true);
      const data = await fetch("http://localhost:9000/cities" + "/" + id);
      const cities = await data.json();
      setCity(cities);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <cityContext.Provider
      value={{
        cities,
        loading,
        loadCity,
        city,
      }}
    >
      {children}
    </cityContext.Provider>
  );
}

export function useCities() {
  const x = useContext(cityContext);
  if (!x) {
    console.error("city is outside the provider ");
    return;
  }
  return x;
}
