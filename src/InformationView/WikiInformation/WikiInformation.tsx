import {Grid, Typography} from '@material-ui/core';
import {useContext} from 'react';
import {AppContext} from '../../AppContext/AppContext';

export default function WikiInformation(): JSX.Element {
  const {summary} = useContext(AppContext);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h5">Summary from wikipedia:</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1"> {summary} </Typography>
      </Grid>
    </Grid>
  );
}
