import {Grid, Typography} from '@material-ui/core';
import {useContext} from 'react';
import {AppContext} from '../AppContext/AppContext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import WeatherInformation from './WeatherInformation/WeatherInformation';
import WikiInformation from './WikiInformation/WikiInformation';

export default function InformationView(): JSX.Element {
  const {isLoaded, isLoading} = useContext(AppContext);

  function DisplayInformation() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <WikiInformation />
        </Grid>
        <Grid item xs={12}>
          <WeatherInformation />
        </Grid>
      </Grid>
    );
  }

  return (
    <LoadingSpinner showSpinnerCondition={isLoading}>
      {isLoaded ? (
        <ErrorDisplay>
          <DisplayInformation />
        </ErrorDisplay>
      ) : (
        <></>
      )}
    </LoadingSpinner>
  );
}

function ErrorDisplay({children}: {children: any}) {
  const {city, hasError} = useContext(AppContext);

  return hasError ? (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="body1" color="secondary">
          Failed to load information for <b>{city}</b>. Are you certain you
          spelled the name correctly?
        </Typography>
      </Grid>
    </Grid>
  ) : (
    children
  );
}
