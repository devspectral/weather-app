import { useState, useEffect, useInsertionEffect } from 'react';
import axios from 'axios';
import {
  IoMdSunny,
  IoMdRainy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdCloudy,
  IoMdSearch,
} from 'react-icons/io';
import {
  BsCloudHaze2Fill,
  BsEye,
  BsCloudDrizzleFill,
  BsThermometer,
  BsWind,
  BsWater,
} from 'react-icons/bs';
import { TbTemperatureCelsius } from 'react-icons/tb';
import { ImSpinner2 } from 'react-icons/im';

const APIkey = 'aaa64c37774b7c5d69eee9ed046bbe75';

const Weather = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('New York');
  const [inputValue, setInputValue] = useState('');
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [fcast, setFcast] = useState([]);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    if (inputValue !== '') {
      setLocation(inputValue);
    }
    const input = document.querySelector('input');

    if (inputValue === '') {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }

    input.value = '';
    e.preventDefault();
  };

  useEffect(() => {
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&cnt=5&appid=${APIkey}`;

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

  useEffect(() => {
    setLoading(true);

    const dataURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

    axios
      .get(dataURL)
      .then((res) => {
        setTimeout(() => {
          setData(res.data);
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err);
        console.log(err);
      });
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg('');
    }, 1500);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  if (!data) {
    return (
      <div className='w-full h-screen bg-bgimage bg-cover bg-center flex flex-col justify-center items-center'>
        <div>
          <ImSpinner2 className='text-5xl animate-spin text-white/50' />
        </div>
      </div>
    );
  }

  let icon;

  switch (data.weather[0].main) {
    case 'Clouds':
      icon = <IoMdCloudy />;
      break;
    case 'Haze':
      icon = <BsCloudHaze2Fill className='text-[#cecece]' />;
      break;
    case 'Rain':
      icon = <IoMdRainy className='text-[#b3b2b2]' />;
      break;
    case 'Clear':
      icon = <IoMdSunny className='text-[#FDFD96]' />;
      break;
    case 'Drizzle':
      icon = <BsCloudDrizzleFill className='text-[#D4FAFA]' />;
      break;
    case 'Snow':
      icon = <IoMdSnow className='text-[#9DCAEB]' />;
      break;
    case 'Thunderstorm':
      icon = <IoMdThunderstorm className='text-[#b9b9b9]' />;
      break;
  }

  const date = new Date();

  return (
    <>
      <div className='w-full h-screen bg-bgimage bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0'>
        {errorMsg && (
          <div className='bg-[#ff6961] text-white p-4 capitalize max-w-[200px] rounded absolute top-8 w-full flex justify-center'>{`${errorMsg.response.data.message}`}</div>
        )}
        <form
          className={`${
            animate ? 'animate-shake' : 'animate-none'
          } h-16 bg-black/20 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8`}
        >
          <div className='h-full relative flex items-center justify-between p-2'>
            <input
              onChange={(e) => handleInput(e)}
              className='flex-1 text-white text-[16px] font-light pl-6 h-full bg-transparent outline-none placeholder:text-white/60'
              type='text'
              placeholder='Search city or country'
            />
            <button
              onClick={(e) => handleSubmit(e)}
              className='bg-[#858585] hover:bg-[#a3a3a3] w-20 h-12 rounded-full flex justify-center items-center transition'
            >
              <IoMdSearch className='text-gray-100 text-2xl' />
            </button>
          </div>
        </form>
        <div className='w-full max-w-[584px] bg-gray-600/30 min-h-[584px] text-white backdrop-blur-2xl rounded-[32px] py-12 px-6'>
          {loading ? (
            <div className='w-full h-full flex justify-center items-center'>
              <ImSpinner2 className='text-5xl animate-spin opacity-50' />
            </div>
          ) : (
            <div>
              <div className='flex items-center gap-x-5 '>
                <div className='text-[87px]'>{icon}</div>
                <div>
                  <div className='text-2xl font-semibold'>
                    {data.name}, {data.sys.country}
                  </div>
                  <div>
                    {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                    {date.getUTCFullYear()}
                  </div>
                </div>
              </div>
              <div className='mb-20 mt-10'>
                <div className='flex justify-center items-center'>
                  <div className='text-[144px] leading-none font-light'>
                    {parseInt(data.main.temp)}
                  </div>
                  <div className='text-4xl'>
                    <TbTemperatureCelsius />
                  </div>
                </div>
                <div className='text-xl capitalize text-center'>
                  {data.weather[0].description}
                </div>
              </div>

              <div className='max-w-[378px] mx-auto flex flex-col gap-y-6'>
                <div className='flex justify-between'>
                  <div className='flex items-center gap-x-2'>
                    <div className='text-[20px] '>
                      <BsEye />
                    </div>
                    <div>
                      Visibility{' '}
                      <span className='ml-2'>{data.visibility / 1000} km</span>
                    </div>
                  </div>
                  <div className='flex items-center gap-x-2'>
                    <div className='text-[20px] '>
                      <BsThermometer />
                    </div>
                    <div className='flex'>
                      Real Feel
                      <div className='ml-2 flex'>
                        {parseInt(data.main.feels_like)}
                        <TbTemperatureCelsius />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex justify-between'>
                  <div className='flex items-center gap-x-2'>
                    <div className='text-[20px] '>
                      <BsWater />
                    </div>
                    <div>
                      Humidity
                      <span className='ml-2'>{data.main.humidity} %</span>
                    </div>
                  </div>
                  <div className='flex items-center gap-x-2'>
                    <div className='text-[20px] '>
                      <BsWind />
                    </div>
                    <div className='flex'>
                      Wind <span className='ml-2'>{data.wind.speed} m/s</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-full p-4 flex justify-center align-center mt-2'>
                <div>
                  <div className='w-full flex p-4 my-2'>
                    {fcast.map((item) => {
                      let forecastIcon;

                      switch (item.main) {
                        case 'Clouds':
                          forecastIcon = <IoMdCloudy />;
                          break;
                        case 'Haze':
                          forecastIcon = (
                            <BsCloudHaze2Fill className='text-[#cecece]' />
                          );
                          break;
                        case 'Rain':
                          forecastIcon = (
                            <IoMdRainy className='text-[#b3b2b2]' />
                          );
                          break;
                        case 'Clear':
                          forecastIcon = (
                            <IoMdSunny className='text-[#FDFD96]' />
                          );
                          break;
                        case 'Drizzle':
                          forecastIcon = (
                            <BsCloudDrizzleFill className='text-[#D4FAFA]' />
                          );
                          break;
                        case 'Snow':
                          forecastIcon = (
                            <IoMdSnow className='text-[#9DCAEB]' />
                          );
                          break;
                        case 'Thunderstorm':
                          forecastIcon = (
                            <IoMdThunderstorm className='text-[#b9b9b9]' />
                          );
                          break;
                      }

                      return (
                        <>
                          <div className='text-[32px] px-4 sm:m-4'>
                            {forecastIcon}
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Weather;
