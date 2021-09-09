import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import Category from '../components/Gender/Category';
import ListAlbum from '../components/Gender/ListAlbum';
import About from '../components/HomePage/About';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    marginTop: '2rem',
    marginBottom: '1rem',
  },
  propertyShow: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default function GenderLayout() {
  const classes = useStyles();

  return (
    <>
      <Container className={classes.root}>
        <div>
          <Typography className={classes.title} variant="h4">
            TEST
          </Typography>
        </div>
        <div className={classes.propertyShow}>
          <Category />
          <ListAlbum />
        </div>
      </Container>
      <About />
    </>
  );
}
