import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import Category from '../components/Gender/Category';
import ListAlbum from '../components/Gender/ListAlbum';
import { GlobalContext } from '../context/GlobalProvider';

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

export default function Gender() {
  const classes = useStyles();
  const { genderName } = useParams();
  const { GlobalState } = useContext(GlobalContext);

  return (
    <Container className={classes.root}>
      <div className={classes.propertyShow}>
        <Typography
          style={{
            marginTop: '2rem',
          }}
          variant="h4"
        >
          <b>{genderName.toUpperCase()}</b>
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
            variant="h6"
          >
            {GlobalState.category.name || 'สินค้าทั้งหมด'}
          </Typography>
          <hr />
        </div>
      </div>
      <div className={classes.propertyShow}>
        <Category genderName={genderName} />
        <ListAlbum genderName={genderName} />
      </div>
    </Container>
  );
}
