import React, { createContext, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
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

const AlertProductContext = createContext();

export default function Gender() {
  const classes = useStyles();
  const { genderName } = useParams();
  const { GlobalState } = useContext(GlobalContext);
  const [alertShow, SetAlertShow] = useState(false);
  const [nameCategoryAlert, SetNameCategoryAlert] = useState('');

  function handleErrorProductShow() {
    SetAlertShow(true);
    setTimeout(() => {
      SetAlertShow(false);
    }, 3000);
  }

  return (
    <AlertProductContext.Provider
      value={{ handleErrorProductShow, SetNameCategoryAlert }}
    >
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
          {alertShow ? (
            <Alert
              severity="error"
              style={{
                zIndex: '1',
                position: 'fixed',
                marginTop: '0.5rem',
                marginLeft: '30%',
                boxShadow: '0 3px 7px 0 rgba(0, 0, 0, 0.2)',
              }}
            >
              <AlertTitle>Error</AlertTitle>
              แสดงสินค้า{' '}
              <b>
                <u>{nameCategoryAlert}</u>
              </b>{' '}
              ไม่สำเร็จ — <strong>กรุณาลองใหม่อีกครั้ง</strong>
            </Alert>
          ) : (
            <></>
          )}
        </div>
        <div className={classes.propertyShow}>
          <Category genderName={genderName} />
          <ListAlbum genderName={genderName} />
        </div>
      </Container>
    </AlertProductContext.Provider>
  );
}

export { AlertProductContext };
