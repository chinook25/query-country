import {Button} from '@material-ui/core';
import {useContext} from 'react';
import {AppContext} from '../AppContext/AppContext';

export default function SearchButton(): JSX.Element {
  const {searchInfo} = useContext(AppContext);

  return (
    <Button variant="contained" onClick={searchInfo}>
      Search
    </Button>
  );
}
