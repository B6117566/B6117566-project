import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginLeft: '2rem',
    height: '2.5rem',
  },
  gap: {
    marginLeft: '0.5rem',
  },
  title: { fontSize: '1.1rem' },
}));

export default function MainMenuSelectIcon() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link to="/genders/men" style={{ textDecoration: 'none' }}>
        <Button>
          <b className={classes.title}>MEN</b>
        </Button>
      </Link>
      <div className={classes.gap} />
      <Link to="/genders/women" style={{ textDecoration: 'none' }}>
        <Button>
          <b className={classes.title}>WOMEN</b>
        </Button>
      </Link>
    </div>
  );
}
