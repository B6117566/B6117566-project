import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useScrollTrigger, Fab, Zoom } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
);

interface Props {
  children: React.ReactElement;
}

function BackToTop(props: Props) {
  const { children } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 200,
  });

  const handleClick = () => {
    window['scrollTo']({ behavior: 'smooth', top: 0 });
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

export default function ScrollTop() {
  return (
    <BackToTop>
      <Fab color="secondary" size="small" aria-label="scroll back to top">
        <KeyboardArrowUpIcon />
      </Fab>
    </BackToTop>
  );
}
