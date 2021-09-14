import {Grid, Paper, Typography} from '@material-ui/core';
import {AppContextProvider} from './AppContext/AppContext';
import CityInput from './CityInput/CityInput';
import InformationView from './InformationView/InformationView';
import SearchButton from './SearchButton/SearchButton';

export default function App() {
  return (
    <AppContextProvider>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2">Location information finder</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Where would you like to go?</Typography>
        </Grid>
        <Grid item xs={12}>
          <CityInput />
        </Grid>
        <Grid item xs={12}>
          <SearchButton />
        </Grid>
        <Grid item xs={12} component={Paper}>
          <InformationView />
        </Grid>
      </Grid>
    </AppContextProvider>
  );
}
