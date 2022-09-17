import { useState, useEffect } from 'react';
import axios from 'axios';

const FCASTkey = 'aaa64c37774b7c5d69eee9ed046bbe75';

const Forecast = () => {
  const [fcast, setFcast] = useState([]);

  useEffect(() => {
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=california&units=metric&cnt=5&appid=${FCASTkey}`;

    axios
      .get(forecastURL)
      .then((res) => {
        setFcast(
          res.data.list.map((day) => {
            return day.weather[0].main;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const mapped = fcast[0].weather.map((item) => {
  //   return item;
  // });

  console.log(fcast);

  return (
    <>
      <div>
        <div></div>
      </div>
    </>
  );
};

export default Forecast;
