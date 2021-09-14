import {TextField} from '@material-ui/core';
import {ChangeEvent, useContext} from 'react';
import {AppContext} from '../AppContext/AppContext';

export default function CityInput(): JSX.Element {
  const {searchTerm, setSearchTerm} = useContext(AppContext);

  function cityChanged(event: ChangeEvent<HTMLInputElement>): void {
    setSearchTerm(event.target.value);
  }

  return (
    <TextField
      id="search-input"
      value={searchTerm}
      onChange={cityChanged}
      type="text"
      autoFocus
    />
  );
}
