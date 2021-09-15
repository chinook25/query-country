import {Grid, Typography} from '@material-ui/core';
import _ from 'lodash';
import {useContext} from 'react';
import {AppContext} from '../../AppContext/AppContext';

export default function WeatherInformation(): JSX.Element {
  const {weather, city, forecast, temperature} = useContext(AppContext);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h5">Weather information</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          The current weather in {city} is: {weather}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          The tempature current is: {temperature}°C
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          For the next few days the weather will be:
          <ul>
            {_.map(forecast, ([temp, wea], index) => (
              <li key={`weather-forecast-${index}`}>
                {wea} with a maximum temperature of {temp}°C
              </li>
            ))}
          </ul>
        </Typography>
      </Grid>
    </Grid>
  );
}
