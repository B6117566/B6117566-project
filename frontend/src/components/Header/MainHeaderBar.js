import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import MainMenuManageIcon from './MainMenuManageIcon';
import MainMenuSelectIcon from './MainMenuSelectIcon';
import { Container } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    boxShadow: '0 3px 10px 0 rgba(0, 0, 0, 0.1)',
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  imgTitle: {
    width: '25px',
    height: '25px',
    maxHeight: '50%',
    maxWidth: '50%',
    marginRight: '1rem',
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    backgroundColor: alpha('#EEEEEE', 1),
    borderRadius: '20px',
    marginLeft: 10,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    fontWeight:'bold',
    [theme.breakpoints.up('sm')]: {
      width: '15ch',
      '&:focus': {
        width: '25ch',
      },
    },
  },
}));

export default function MainHeader() {
  const classes = useStyles();
  const [search, setSearch] = React.useState('');

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Container>
        <Toolbar>
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
            <div className={classes.title}>
              <img src="/static/logo.png" alt="LOGO" className={classes.imgTitle} />
              <Typography variant="h5" noWrap>
                <b>Clothing Store</b>
              </Typography>
            </div>
          </Link>
          <MainMenuSelectIcon />
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              type="text"
              placeholder="ค้นหาสินค้า…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={search}
              onChange={handleChange}
              onKeyDown={(event) => {
                if (event.keyCode === 13) {
                  console.log(search || null);
                }
              }}
            />
          </div>
          <MainMenuManageIcon />
        </Toolbar>
      </Container>
    </div>
  );
}
