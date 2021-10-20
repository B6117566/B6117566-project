import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import ListAlbumSearch from '../components/Search/ListAlbumSearch';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  propertyShow: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '0.5rem',
  },
});

export default function Search() {
  const classes = useStyles();
  const { search } = useParams();

  return (
    <Container className={classes.root}>
      <div className={classes.propertyShow}>
        <Typography
          style={{
            marginTop: '2rem',
          }}
          variant="h4"
        >
          <b>การค้นหาสินค้า</b>
        </Typography>
        <Typography
          style={{
            marginTop: '1.9rem',
            marginLeft: '1rem',
            marginRight: '1rem',
          }}
          variant="h4"
        >
          |
        </Typography>
        <div>
          <Typography
            style={{
              marginTop: '2.24rem',
            }}
            variant="h5"
          >
            "{search}"
          </Typography>
          <hr />
        </div>
      </div>
      <div className={classes.propertyShow}>
        <ListAlbumSearch search={search} />
      </div>
    </Container>
  );
}
