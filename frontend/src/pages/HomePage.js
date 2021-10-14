import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HomeCarousel from '../components/HomePage/HomeCarousel';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    marginTop: '1.5rem',
    marginBottom: '1rem',
  },
});

function HomePage() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Container>
          <Typography className={classes.title} variant="h4">
            HOME
          </Typography>
          <HomeCarousel />
        </Container>
      </div>
    </>
  );
}

export default HomePage;
