import { useState, useEffect } from 'react';
import axios from 'axios';

const FCASTkey = 'aaa64c37774b7c5d69eee9ed046bbe75';

const Forecast = () => {
  const [fcast, setFcast] = useState([]);

  useEffect(() => {
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=chicago&units=metric&cnt=5&appid=${FCASTkey}`;

    axios
      .get(forecastURL)
      .then((res) => {
        setFcast(
          res.data.list.map((day) => {
            return day.weather[0];
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location]);

  return (
    <>
      <div>
        <div className='w-full flex p-4 my-2'>
          {fcast.map((item) => {
            return <div className='px-4 sm:m-4'>{item.main}</div>;
          })}
        </div>
      </div>
    </>
  );
};

export default Forecast;
