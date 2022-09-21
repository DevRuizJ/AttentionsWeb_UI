import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/styles';
import SearchIcon from '@material-ui/icons/Search';

import {
  Paper,
  IconButton,
  InputBase
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    justifyContent: 'flex-end',
    margin: theme.spacing(1),
    display: 'flex',
    paddingRight: theme.spacing(1.5),
  },
  paper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    maxWidth: 400,
  },
  iconButton: {
    padding: 10,
    '& *': {
      color: theme.palette.secondary.dark,
    }
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    width: '100%',

  },
}));

const SearchBox = ({ onChangeFilter, filter }) => {
  const classes = useStyles();

  const [filtroText, setfiltroText] = React.useState(filter)

  const handleChangeRuc = event => {
    const _filterText = event.target.value.toUpperCase()
    setfiltroText(_filterText)
  }

  useEffect(() => {
    onChangeFilter(filtroText)
  }, [filtroText])

  useEffect(() => {
    if (!filter)
      setfiltroText(filter);
  }, [filter, setfiltroText])


  return (
    <div className={classes.root}>

      <Paper className={classes.paper}>
        <InputBase
          className={classes.input}
          onChange={handleChangeRuc}
          value={filtroText}
          placeholder="Buscar..."
          inputProps={{ 'aria-label': 'Filtro de servicio' }}
        />
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      
    </div>
  )
}

export default SearchBox
