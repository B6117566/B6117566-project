import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HomeCarousel from '../components/HomePage/HomeCarousel';
import About from '../components/HomePage/About';
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
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
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
        <div className={classes.footer}>
          <About />
        </div>
      </div>
    </>
  );
}

export default HomePage;
