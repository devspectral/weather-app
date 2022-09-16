import { useState, useEffect, useInsertionEffect } from 'react';
import axios from 'axios';

const FCASTkey = 'aaa64c37774b7c5d69eee9ed046bbe75';

const Forecast = () => {
  const [fcast, setFcast] = useState(null);

  useEffect(() => {
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=Chicago&units=metric&cnt=5&appid=${FCASTkey}`;

    axios
      .get(forecastURL)
      .then((res) => {
        setFcast(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location]);

  console.log();

  return (
    <>
      <div>
        <div>{fcast.cod}</div>
      </div>
    </>
  );
};

export default Forecast;
