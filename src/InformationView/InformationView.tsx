import {Grid, Typography} from '@material-ui/core';
import _ from 'lodash';
import {useContext} from 'react';
import {AppContext} from '../AppContext/AppContext';

export default function InformationView(): JSX.Element {
  const {hasError, summary, weather, temperature, city, isLoaded, forecast} =
    useContext(AppContext);

  function DisplayInformation() {
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
        <Grid item xs={12}>
          <Typography variant="h5">Summary from wikipedia:</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1"> {summary} </Typography>
        </Grid>
      </Grid>
    );
  }

  function ErrorDisplay() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="body1" color="secondary">
            Failed to load information for <b>{city}</b>. Are you certain you
            spelled the name correctly?
          </Typography>
        </Grid>
      </Grid>
    );
  }
  return isLoaded ? (
    hasError ? (
      <ErrorDisplay />
    ) : (
      <DisplayInformation />
    )
  ) : (
    <></>
  );
}
