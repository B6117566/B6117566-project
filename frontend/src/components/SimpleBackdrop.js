import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'rgba(255,255,255,0.0)',
  },
  show: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function SimpleBackdrop() {
  const classes = useStyles();

  return (
    <>
      <Backdrop className={classes.backdrop} open={true}>
        <div className={classes.show}>
          <CircularProgress color="inherit" />
          <br />
          <Typography>กำลังโหลด</Typography>
        </div>
      </Backdrop>
    </>
  );
}
