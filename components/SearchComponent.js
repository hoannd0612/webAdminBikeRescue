import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import {
  Grid,
  IconButton,
  InputBase,
  Divider,
  makeStyles
} from '@material-ui/core';
import { Search, FilterList, Clear } from '@material-ui/icons';
import cx from 'classnames';
import AlertDialog from '../layouts/AlertDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    maxWidth: 600
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10,
    display: 'flex'
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

const emptyFunction = () => {};

function SearchComponent({
  placeholder,
  searchMessage,
  setSearchMessage = emptyFunction
}) {
  const classes = useStyles();

  const [openAdvanceSearch, setOpenAdvanceSearch] = useState(false);
  const [value, setValue] = useState(searchMessage);
  const debounceLoadData = useCallback(debounce(setSearchMessage, 1000), []);

  function handleSearchChange(event) {
    const { value } = event.target;

    setValue(value);
    debounceLoadData(value);
  }

  return (
    <Grid className={cx(classes.root, '')}>
      <Grid className={classes.iconButton}>
        <Search />
      </Grid>
      <InputBase
        value={value}
        onChange={handleSearchChange}
        placeholder={placeholder}
        className={classes.input}
      />
      <IconButton
        onClick={() => {
          setValue('');
          debounceLoadData('');
        }}
        className={classes.iconButton}
      >
        <Clear />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        onClick={() => setOpenAdvanceSearch(false)}
        color="primary"
        className={classes.iconButton}
      >
        <FilterList />
      </IconButton>
      <AlertDialog
        fullWidth
        size="sm"
        isFooter={false}
        isOpenDialog={openAdvanceSearch}
        setIsOpenDialog={setOpenAdvanceSearch}
        content={
          <Grid container justify="center" alignItems="center">
            Advance filter here (without date range)
          </Grid>
        }
      />
    </Grid>
  );
}
export default SearchComponent;
