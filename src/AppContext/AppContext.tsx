import axios, {AxiosResponse} from 'axios';
import _ from 'lodash';
import {createContext, useState} from 'react';
import WikiJS, {Page} from 'wikijs';
import {IAppContext} from './IAppContext';

export const AppContext = createContext<IAppContext>({} as IAppContext);

export function AppContextProvider({children}: {children: any}) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [temperature, setTemperature] = useState<number>(0);
  const [summary, setSummary] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [forecast, setForeCast] = useState<[number, string][]>([]);

  function searchInfo() {
    setHasError(false);
    setIsLoaded(false);
    setIsLoading(true);
    setCity(searchTerm);
    getWikiData()
      .then(getWeatherData)
      .then(() => {
        setIsLoaded(true);
      })
      .finally(() => {
        setIsLoading(false);
      });

    function getWikiData(): Promise<[number, number]> {
      return WikiJS()
        .page(searchTerm)
        .then((page: Page) => {
          page.summary().then((summary) => {
            setSummary(summary);
          });
          return page.coordinates().then(({lat, lon}) => {
            return [lat, lon] as [number, number];
          });
        })
        .catch((error) => {
          setHasError(true);
          console.log(`Error getting wikipedia data: ${error.message}`);
          return [0, 0];
        });
    }
  }

  function getWeatherData([latitude, longitude]: [number, number]) {
    return axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=70373dc9a6dad27f00330accf7e56bc7&units=metric`
      )
      .then((result: AxiosResponse<any>) => {
        setWeather(`${result.data.current.weather[0].description}`);
        setTemperature(parseFloat(result.data.current.temp));
        setForeCast(getForeCast(result.data.daily));
      })
      .catch((error) => {
        setHasError(true);
        console.log(`Error getting weather data: ${error.message}`);
      });
  }

  function getForeCast(input: any[]): [number, string][] {
    return _.map(input, (dailyForcast: any) => {
      return [
        parseFloat(dailyForcast.temp.max),
        dailyForcast.weather[0].description
      ];
    });
  }

  return (
    <AppContext.Provider
      value={{
        city,
        hasError,
        forecast,
        searchTerm,
        isLoaded,
        isLoading,
        summary,
        temperature,
        weather,
        setSearchTerm,
        searchInfo
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
